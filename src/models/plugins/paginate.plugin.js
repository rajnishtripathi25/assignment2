/* eslint-disable no-param-reassign */
const util = require('util');

const paginate = (schema) => {
  schema.statics.paginate = async function ({
    filter = {},
    fields = {},
    options = {},
  }) {
    try {
      fields = fields || {};
      let { sort, limit, page, search, populate, ...rest } = options || {};
      let { text = '', fields: searchFields } = search || {};
      const searchTerms = text
        ?.trim()
        ?.split(/\s+/)
        .map((term) => {
          term = term.trim();
          if (term !== '') {
            if (isNaN(term)) {
              return new RegExp(`\\b${term}`, 'i');
            } else {
              return new RegExp(`${term}`);
            }
          }
        });
      if (searchFields?.length && searchTerms?.length) {
        searchingRegex = {
          $or: searchFields.map((field) => ({
            [field.trim()]: { $in: searchTerms },
          })),
        };
        filter = { ...filter, ...searchingRegex };
      }
      if (sort) {
        sort = Object.entries(sort).reduce((acc, [field, order]) => {
          // Handle sort field and order separately
          const sortOrder = `${order}` === '1' ? 1 : -1;
          acc[field] = sortOrder;
          return acc;
        }, {});
      }

      limit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
      page = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
      const skip = (page - 1) * limit;
      const countPromise = this.countDocuments(filter).exec();
      options = { ...rest, sort, skip, limit };
      let docsPromise = this.find(filter, fields, options);

      if (populate) {
        docsPromise = Object.entries(populate).reduce(
          (currentQuery, [path, selectFields]) => {
            const select = selectFields.join(' ');
            return currentQuery.populate({ path, select });
          },
          docsPromise
        );
      }

      docsPromise = docsPromise.exec();

      const [totalResults, results] = await Promise.all([
        countPromise,
        docsPromise,
      ]);

      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
        searchingText: text || false,
      };

      return Promise.resolve(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

module.exports = paginate;
