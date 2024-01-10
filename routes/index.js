const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');



router.get('/', function(req, res) {
  res.render('index');
});

router.get('/instagram', async function(req, res) {
  let b=0;
  res.render('instagram');
});

router.post('/insta', async function(req, res) {
  // let a=;
  const url = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${req.body.link}`;
  console.log(url)
  console.log(req.body.link)
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c61253eb60msh639047a9288b8e5p1899a0jsn1f5c44cd748f',
      'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
    }
  };
  let result;
  
  try {
    const response = await fetch(url, options);
     result = await response.json();

    console.log(result);
    res.render('insta',{type:result[0].type,img:result[0].thumb,title:result[0].title,down:result[0].url});
    return;
  } catch (error) {
    console.error(error);
  }
  // console.log(result[0].type)
  // console.log(result[0].title)
  // console.log(result[0].thumb)
  // console.log(result[0].url)
  res.render('insta',{type:"There was Some Problem",img:"There was Some Problem",title:"There was Some Problem",down:"There was Some Problem"});
});







module.exports = router;
