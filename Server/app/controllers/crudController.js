'use strict'

import fetch from "node-fetch";
import config from '../../config.js';
import crud_model from '../models/crudModel.js'

const functions = {
    save: async function (req, res) {
      const path = '/search/sgsg';
    
      const resApi = await fetch(`${config.source.url}${path}`, {
        compress: true,
        timeout: 60e3, // 60s timeout as default
        follow: 0,
        headers: {
          'content-type': 'application/json'
        }
      }).catch(err => {
        console.log('Some error!');
        throw err
      })
      let data = await resApi.json()
      let checkdb = crud_model.update(data)
      if(checkdb){
        res.status(200).send({
          message: 'save api data',
          data: []
        })
      }else{
        res.status(500).send({
          message: 'something went wrong',
          data: []
        })
      }
    },
    get: async function (req, res) {
      let page = req.query.page == undefined ? 1 : req.query.page
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
        res.status(200).send({
          message: 'get api data',
          data: checkdb,
          limitperpage: 5,
          lengthdata: lengthdata
        })
      }else{
        res.status(500).send({
          message: 'something went wrong',
          data: []
        })
      }
    },
    update: async function (req, res) {
      let reqall = req.body
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
          res.status(200).send({
            message: 'update api data',
            data: []
          })
        }else{
          res.status(500).send({
            message: 'something went wrong',
            data: []
          })
        }
      }
    },
    delete: async function (req, res) {
      let reqall = req.body
      let checkdb = await crud_model.get()
      if(checkdb){
        checkdb.outlets.availability.results.splice(parseInt(reqall.index), 1);
        let updatedb = crud_model.update(checkdb)
        if(updatedb){
          res.status(200).send({
            message: 'delete api data',
            data: []
          })
        }else{
          res.status(500).send({
            message: 'something went wrong',
            data: []
          })
        }
      }
    },
  }
  
export default functions;