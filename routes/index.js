const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');


// Gets the Main Page
router.get('/', function (req, res) {
  res.render('index');
});

//Gets the Reels downloader page
router.get('/instagram', async function (req, res) {
  res.render('instagram');
});

//Gets the Instagram Profile Viewer Page
router.get('/instapro', async function (req, res) {
  res.render('instapro');
});

//Gets the Youtube Video Downloader Page
router.get('/youtube', async function (req, res) {
  res.render('youtube');
});

//Reels download api
router.post('/insta', async function (req, res) {
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
    res.render('insta', { type: result[0].type, img: result[0].thumb, title: result[0].title, down: result[0].url });
    return;
  } catch (error) {
    console.error(error);
  }
  // console.log(result[0].type)
  // console.log(result[0].title)
  // console.log(result[0].thumb)
  // console.log(result[0].url)
  res.render('insta', { type: "There was Some Problem", img: "There was Some Problem", title: "There was Some Problem", down: "There was Some Problem" });
});

//for Instagram profile Api
router.post('/instapro', async function (req, res) {
  

  const url = `https://instagram-fast.p.rapidapi.com/profile/${req.body.link}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c61253eb60msh639047a9288b8e5p1899a0jsn1f5c44cd748f',
      'X-RapidAPI-Host': 'instagram-fast.p.rapidapi.com'
    }
  };
  // 9641f30c71mshe3273316ae22245p1f9264jsneed684645a52   Bcz this API has only 30 req per day :(
  //  'c61253eb60msh639047a9288b8e5p1899a0jsn1f5c44cd748f',
  let result;
  console.log(req.body.link)
  try {
    const response = await fetch(url, options);
    result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  // console.log(result.data.user.biography);
  // console.log(result.data.user.username);
  // console.log(result.data.user.full_name);
  // console.log(result.data.user.profile_pic_url_hd);
  // console.log(result.data.user.edge_followed_by.count);
  // console.log(result.data.user.edge_follow.count);
  // console.log(result.data.user.id);
  // console.log(result.data.user.is_private);
  // console.log(result.data.user.is_verified);
  // console.log(result.data.user.edge_owner_to_timeline_media.count);
  if (result.status!="ok") {
    res.render(`instaproshow`,{un:`${req.body.link}`,fn:"There Some Problem",pic:"",bio:"",following:0,followers:0,pri:0,ver:0,post:0,id:0,unlink:`https://www.instagram.com/${req.body.link}`})
    if(result.message){
      res.send(result.message)
    }
    return;
  }

  res.render(`instaproshow`,{un:result.data.user.username,fn:result.data.user.full_name,pic:result.data.user.profile_pic_url_hd,bio:result.data.user.biography,following:result.data.user.edge_follow.count,followers:result.data.user.edge_followed_by.count,pri:result.data.user.is_private,ver:result.data.user.is_verified,post:result.data.user.edge_owner_to_timeline_media.count,id:result.data.user.id,unlink:`https://www.instagram.com/${req.body.link}`})
  return;

  res.render(`instaproshow`,{un:`${req.body.link}`,fn:"There Some Problem",pic:"",bio:"",following:0,followers:0,pri:0,ver:0,post:0,id:0,unlink:`https://www.instagram.com/${req.body.link}`})


});

//For YT video Api
router.post('/ytdown', async function (req, res) {

  const url = 'https://youtube86.p.rapidapi.com/api/youtube/links';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Forwarded-For': '70.41.3.18',
      'X-RapidAPI-Key': 'c61253eb60msh639047a9288b8e5p1899a0jsn1f5c44cd748f',
      'X-RapidAPI-Host': 'youtube86.p.rapidapi.com'
    },
    body: {
      url: 'https://youtube.com/shorts/bv5x_WWDI2g?si=GYxnYiIzpD7j0LST'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  res.render(`ytdown`)
});




module.exports = router;
