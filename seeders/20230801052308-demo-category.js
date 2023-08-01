'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Categories', [{
            categoryName: 'Electronics',
            subcategory: 'TVs',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Electronics',
            subcategory: 'Watches',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Electronics',
            subcategory: 'Phones',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Vehicles',
            subcategory: 'Bikes',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Vehicles',
            subcategory: 'Cars',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Furnitures',
            subcategory: 'Sofa',
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            categoryName: 'Furnitures',
            subcategory: 'Bed',
            createdAt: new Date(),
            updatedAt: new Date()
          }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {}); 
  }
};
