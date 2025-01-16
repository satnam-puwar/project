export const getFilters = (filters) => {
  let updatedFilter = {};
  if (filters !== undefined) {
    Object.keys(filters).forEach(function (key) {
      if (key === "hotelName") {
        if (typeof filters[key] === "object") {
          console.log("if block")
          updatedFilter = { ...updatedFilter, hotelName: filters[key]};
        } else {
          console.log("else block")
          updatedFilter = { ...updatedFilter, hotelName: filters[key] };
        }
      }

      if (key === "address") {
        if (typeof filters[key] === "object") {
          updatedFilter = { ...updatedFilter, address: filters[key] };
        } else {
          updatedFilter = {
            ...updatedFilter,
            address: [filters[key]],
          };
        }
      }
      if (key === "roomTypes") {
        if (typeof filters[key] === "object") {
          updatedFilter = { ...updatedFilter, roomTypes: filters[key] };
        } else {
          updatedFilter = {
            ...updatedFilter,
            roomTypes: [filters[key]],
          };
        }
      }

      if (key === "priceRange") {
        if (typeof filters[key] === "object") {
          updatedFilter = { ...updatedFilter, priceRange: filters[key] };
        } else {
          updatedFilter = {
            ...updatedFilter,
            priceRange: [filters[key]],
          };
        }
      }

      if (key === "ratings") {
        if (typeof filters[key] === "object") {
          updatedFilter = { ...updatedFilter, ratings: filters[key] };
        } else {
          updatedFilter = { ...updatedFilter, ratings: [filters[key]] };
        }
      }

      if (key === "reviewsCount") {
        if (typeof filters[key] === "object") {
          updatedFilter = {
            ...updatedFilter,
            reviewsCount: filters[key].map((e) => e.toLowerCase()),
          };
        } else {
          updatedFilter = {
            ...updatedFilter,
            reviewsCount: [filters[key].toLowerCase()],
          };
        }
      }
    });
  }

  return updatedFilter;
};
