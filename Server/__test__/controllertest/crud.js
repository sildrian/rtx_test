'use strict'

const crud_model = require('../modeltest/crud.js')

const functions = {
    get: async function () {
      let page = 1
      let checkdb = await crud_model.get()
      if(checkdb){
        let maxdata = parseInt(page) * 5
        let checkstartidx = parseInt(maxdata) - 5
        let lengthdata = checkdb.outlets.availability.results.length
        maxdata = maxdata > lengthdata ? lengthdata : maxdata
        let dataPagination = checkdb.outlets.availability.results.filter(function (el,idx) {
          if(idx >= checkstartidx && idx < maxdata){
              return el
          }
        });
        checkdb.outlets.availability.results = dataPagination
        return 'get api data'
      }else{
        return 'something went wrong!'
      }
    },
    update: async function () {
      let reqall = {
        name: "test",
        country: "test",
        score: "test"
      }
      let checkdb = await crud_model.get()
      if(checkdb){
        checkdb.outlets.availability.results.forEach(function (value, i) {
          if(parseInt(reqall.index) == i){
            value.property.name = reqall.name != '' && reqall.name
            value.property.location.country = reqall.country != '' && reqall.country
            value.property.reviews.summary.score = reqall.score != '' && reqall.score 
          }
        })
        let updatedb = crud_model.update(checkdb)
        if(updatedb){
            return 'update api data'
        }else{
            return 'something went wrong!'
        }
      }
    },
    delete: async function () {
        let reqall = {
            name: "test",
            country: "test",
            score: "test"
        }
        let checkdb = await crud_model.get()
        if(checkdb){
            checkdb.outlets.availability.results.splice(parseInt(reqall.index), 1);
            let updatedb = crud_model.update(checkdb)
            if(updatedb){
                return 'delete api data'
            }else{
                return 'something went wrong!'
            }
        }
        },
}
  
module.exports = functions;