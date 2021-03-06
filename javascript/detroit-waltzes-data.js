var mapdata,
    locations;

mapdata = {
  "src": "detroit_4887x2748_16_9_aspect_ratio.png",
  "width": 4887,
  "height": 2748,
  "registration": {
    "topleft": {
      "address": "Norfolk &amp; Garfield St, Redford Charter Township, MI 48240, USA",
      "longitude": -83.290114,
      "latitude": 42.439265,
      "x_pixel": 83,
      "y_pixel": 79
    },
    "topright": {
      "address": "Vernier Rd &amp; Marter Rd, Grosse Pointe Woods, MI 48236, USA",
      "longitude": -82.896602,
      "latitude": 42.441077,
      "x_pixel": 4783,
      "y_pixel": 181
    },
    "bottomleft": {
      "address": "S Telegraph Rd &amp; Colgate St, Dearborn Heights, MI 48125, USA",
      "longitude": -83.27099800000001,
      "latitude": 42.279921,
      "x_pixel": 236,
      "y_pixel": 2655
    },
    "bottomright": {
      "address": "Tecumseh Rd E &amp; Jefferson Blvd, Windsor, ON N8T, Canada",
      "longitude": -82.951809,
      "latitude": 42.310462,
      "x_pixel": 4116,
      "y_pixel": 2279
    }
  }
};

stillImageData = {
  "1": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/1.jpg",
      "846x486": "images/stills-846x486-jpg/1.jpg"
    },
    "numPosX": "42%",
    "numPosY": "24%",
    "waltz": 1,
    "movement": null
  },
  "2": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/2.jpg",
      "846x486": "images/stills-846x486-jpg/2.jpg"
    },
    "numPosX": "43%",
    "numPosY": "36%",
    "waltz": 2,
    "movement": null
  },
  "3": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/3.jpg",
      "846x486": "images/stills-846x486-jpg/3.jpg"
    },
    "numPosX": "38%",
    "numPosY": "8%",
    "waltz": 3,
    "movement": null
  },
  "4": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/4.jpg",
      "846x486": "images/stills-846x486-jpg/4.jpg"
    },
    "numPosX": "45%",
    "numPosY": "60%",
    "waltz": 4,
    "movement": null
  },
  "5": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/5.jpg",
      "846x486": "images/stills-846x486-jpg/5.jpg"
    },
    "numPosX": "45%",
    "numPosY": "8%",
    "waltz": 5,
    "movement": null
  },
  "6": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/6.jpg",
      "846x486": "images/stills-846x486-jpg/6.jpg"
    },
    "numPosX": "25%",
    "numPosY": "12%",
    "waltz": 6,
    "movement": "B"
  },
  "7": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/7.jpg",
      "846x486": "images/stills-846x486-jpg/7.jpg"
    },
    "numPosX": "52%",
    "numPosY": "58%",
    "waltz": 7,
    "movement": null
  },
  "8": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/8.jpg",
      "846x486": "images/stills-846x486-jpg/8.jpg"
    },
    "numPosX": "25%",
    "numPosY": "8%",
    "waltz": 8,
    "movement": null
  },
  "9": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/9.jpg",
      "846x486": "images/stills-846x486-jpg/9.jpg"
    },
    "numPosX": "77%",
    "numPosY": "12%",
    "waltz": 9,
    "movement": null
  },
  "10": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/10.jpg",
      "846x486": "images/stills-846x486-jpg/10.jpg"
    },
    "numPosX": "20%",
    "numPosY": "20%",
    "waltz": 10,
    "movement": "B"
  },
  "11": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/11.jpg",
      "846x486": "images/stills-846x486-jpg/11.jpg"
    },
    "numPosX": "50%",
    "numPosY": "20%",
    "waltz": 11,
    "movement": "A"
  },
  "12": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/12.jpg",
      "846x486": "images/stills-846x486-jpg/12.jpg"
    },
    "numPosX": "9%",
    "numPosY": "37%",
    "waltz": 12,
    "movement": "B"
  },
  "13": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/13.jpg",
      "846x486": "images/stills-846x486-jpg/13.jpg"
    },
    "numPosX": "65%",
    "numPosY": "8%",
    "waltz": 13,
    "movement": null
  },
  "14": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/14.jpg",
      "846x486": "images/stills-846x486-jpg/14.jpg"
    },
    "numPosX": "17%",
    "numPosY": "25%",
    "waltz": 14,
    "movement": "A"
  },
  "15": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/15.jpg",
      "846x486": "images/stills-846x486-jpg/15.jpg"
    },
    "numPosX": "70%",
    "numPosY": "30%",
    "waltz": 15,
    "movement": "A"
  },
  "16": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/16.jpg",
      "846x486": "images/stills-846x486-jpg/16.jpg"
    },
    "numPosX": "18%",
    "numPosY": "20%",
    "waltz": 16,
    "movement": "A"
  },
  "17": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/17.jpg",
      "846x486": "images/stills-846x486-jpg/17.jpg"
    },
    "numPosX": "10%",
    "numPosY": "6%",
    "waltz": 17,
    "movement": "B"
  },
  "18": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/18.jpg",
      "846x486": "images/stills-846x486-jpg/18.jpg"
    },
    "numPosX": "30%",
    "numPosY": "65%",
    "waltz": 18,
    "movement": null
  },
  "19": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/19.jpg",
      "846x486": "images/stills-846x486-jpg/19.jpg"
    },
    "numPosX": "50%",
    "numPosY": "66%",
    "waltz": 19,
    "movement": "A"
  },
  "20": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/20.jpg",
      "846x486": "images/stills-846x486-jpg/20.jpg"
    },
    "numPosX": "28%",
    "numPosY": "30%",
    "waltz": 20,
    "movement": null
  },
  "21": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/21.jpg",
      "846x486": "images/stills-846x486-jpg/21.jpg"
    },
    "numPosX": "11%",
    "numPosY": "11%",
    "waltz": 21,
    "movement": null
  },
  "22": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/22.jpg",
      "846x486": "images/stills-846x486-jpg/22.jpg"
    },
    "numPosX": "25%",
    "numPosY": "60%",
    "waltz": 22,
    "movement": "B"
  },
  "23": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/23.jpg",
      "846x486": "images/stills-846x486-jpg/23.jpg"
    },
    "numPosX": "76%",
    "numPosY": "65%",
    "waltz": 23,
    "movement": "B"
  },
  "24": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/24.jpg",
      "846x486": "images/stills-846x486-jpg/24.jpg"
    },
    "numPosX": "42%",
    "numPosY": "65%",
    "waltz": 24,
    "movement": "C"
  },
  "25": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/25.jpg",
      "846x486": "images/stills-846x486-jpg/25.jpg"
    },
    "numPosX": "11%",
    "numPosY": "5%",
    "waltz": 25,
    "movement": null
  },
  "26": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/26.jpg",
      "846x486": "images/stills-846x486-jpg/26.jpg"
    },
    "numPosX": "32%",
    "numPosY": "26%",
    "waltz": 26,
    "movement": "B"
  },
  "27": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/27.jpg",
      "846x486": "images/stills-846x486-jpg/27.jpg"
    },
    "numPosX": "74%",
    "numPosY": "6%",
    "waltz": 27,
    "movement": "B"
  },
  "28": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/28.jpg",
      "846x486": "images/stills-846x486-jpg/28.jpg"
    },
    "numPosX": "27%",
    "numPosY": "68%",
    "waltz": 28,
    "movement": "A"
  },
  "29": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/29.jpg",
      "846x486": "images/stills-846x486-jpg/29.jpg"
    },
    "numPosX": "67%",
    "numPosY": "8%",
    "waltz": 29,
    "movement": "C"
  },
  "30": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/30.jpg",
      "846x486": "images/stills-846x486-jpg/30.jpg"
    },
    "numPosX": "65%",
    "numPosY": "14%",
    "waltz": 30,
    "movement": "A"
  },
  "31": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/31.jpg",
      "846x486": "images/stills-846x486-jpg/31.jpg"
    },
    "numPosX": "71%",
    "numPosY": "14%",
    "waltz": 31,
    "movement": null
  },
  "32": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/32.jpg",
      "846x486": "images/stills-846x486-jpg/32.jpg"
    },
    "numPosX": "32%",
    "numPosY": "13%",
    "waltz": 32,
    "movement": null
  },
  "33": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/33.jpg",
      "846x486": "images/stills-846x486-jpg/33.jpg"
    },
    "numPosX": "40%",
    "numPosY": "64%",
    "waltz": 33,
    "movement": "A"
  },
  "34": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/34.jpg",
      "846x486": "images/stills-846x486-jpg/34.jpg"
    },
    "numPosX": "70%",
    "numPosY": "18%",
    "waltz": 34,
    "movement": null
  },
  "35": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/35.jpg",
      "846x486": "images/stills-846x486-jpg/35.jpg"
    },
    "numPosX": "72%",
    "numPosY": "12%",
    "waltz": 35,
    "movement": "B"
  },
  "36": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/36.jpg",
      "846x486": "images/stills-846x486-jpg/36.jpg"
    },
    "numPosX": "10%",
    "numPosY": "14%",
    "waltz": 36,
    "movement": null
  },
  "37": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/37.jpg",
      "846x486": "images/stills-846x486-jpg/37.jpg"
    },
    "numPosX": "28%",
    "numPosY": "33%",
    "waltz": 37,
    "movement": null
  },
  "38": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/38.jpg",
      "846x486": "images/stills-846x486-jpg/38.jpg"
    },
    "numPosX": "50%",
    "numPosY": "13%",
    "waltz": 38,
    "movement": "B"
  },
  "39": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/39.jpg",
      "846x486": "images/stills-846x486-jpg/39.jpg"
    },
    "numPosX": "22%",
    "numPosY": "63%",
    "waltz": 39,
    "movement": "C"
  },
  "40": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/40.jpg",
      "846x486": "images/stills-846x486-jpg/40.jpg"
    },
    "numPosX": "34%",
    "numPosY": "24%",
    "waltz": 40,
    "movement": "A"
  },
  "41": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/41.jpg",
      "846x486": "images/stills-846x486-jpg/41.jpg"
    },
    "numPosX": "35%",
    "numPosY": "16%",
    "waltz": 41,
    "movement": "B"
  },
  "42": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/42.jpg",
      "846x486": "images/stills-846x486-jpg/42.jpg"
    },
    "numPosX": "25%",
    "numPosY": "50%",
    "waltz": 42,
    "movement": null
  },
  "43": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/43.jpg",
      "846x486": "images/stills-846x486-jpg/43.jpg"
    },
    "numPosX": "69%",
    "numPosY": "14%",
    "waltz": 43,
    "movement": "C"
  },
  "44": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/44.jpg",
      "846x486": "images/stills-846x486-jpg/44.jpg"
    },
    "numPosX": "52%",
    "numPosY": "36%",
    "waltz": 44,
    "movement": "B"
  },
  "45": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/45.jpg",
      "846x486": "images/stills-846x486-jpg/45.jpg"
    },
    "numPosX": "45%",
    "numPosY": "20%",
    "waltz": 45,
    "movement": "C"
  },
  "46": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/46.jpg",
      "846x486": "images/stills-846x486-jpg/46.jpg"
    },
    "numPosX": "16%",
    "numPosY": "16%",
    "waltz": 46,
    "movement": "A"
  },
  "47": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/47.jpg",
      "846x486": "images/stills-846x486-jpg/47.jpg"
    },
    "numPosX": "64%",
    "numPosY": "13%",
    "waltz": 47,
    "movement": "A"
  },
  "48": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/48.jpg",
      "846x486": "images/stills-846x486-jpg/48.jpg"
    },
    "numPosX": "62%",
    "numPosY": "61%",
    "waltz": 48,
    "movement": "A"
  },
  "49": {
    "path": {
      "1920x1080": "images/stills-1920x1080-jpg/49.jpg",
      "846x486": "images/stills-846x486-jpg/49.jpg"
    },
    "numPosX": "11%",
    "numPosY": "6%",
    "waltz": 49,
    "movement": "A"
  }
};

interviewData = {
  "6B": {
    "index": "017",
    "waltz": "6B",
    "movement": null,
    "webvtt": "webvtt/spanish/6B.vtt"
  },
  "16A": {
    "index": "046",
    "waltz": "16A",
    "movement": null,
    "webvtt": "webvtt/spanish/16A.vtt"
  },
  "17B": {
    "index": "050",
    "waltz": "17B",
    "movement": null,
    "webvtt": "webvtt/spanish/17B.vtt"
  },
  "22A": {
    "index": "064",
    "waltz": "22A",
    "movement": null,
    "webvtt": "webvtt/spanish/22A.vtt"
  },
  "22C": {
    "index": "066",
    "waltz": "22C",
    "movement": null,
    "webvtt": "webvtt/spanish/22C.vtt"
  },
  "23A": {
    "index": "067",
    "waltz": "23A",
    "movement": null,
    "webvtt": "webvtt/spanish/23A.vtt"
  },
  "24A": {
    "index": "070",
    "waltz": "24A",
    "movement": null,
    "webvtt": "webvtt/spanish/24A.vtt"
  },
  "24C": {
    "index": "072",
    "waltz": "24C",
    "movement": null,
    "webvtt": "webvtt/spanish/24C.vtt"
  },
  "27C": {
    "index": "081",
    "waltz": "27C",
    "movement": null,
    "webvtt": "webvtt/spanish/27C.vtt"
  },
  "28A": {
    "index": "082",
    "waltz": "28A",
    "movement": null,
    "webvtt": "webvtt/spanish/28A.vtt"
  },
  "28C": {
    "index": "084",
    "waltz": "28C",
    "movement": null,
    "webvtt": "webvtt/spanish/28C.vtt"
  },
  "30A": {
    "index": "088",
    "waltz": "30A",
    "movement": null,
    "webvtt": "webvtt/spanish/30A.vtt"
  },
  "33A": {
    "index": "097",
    "waltz": "33A",
    "movement": null,
    "webvtt": "webvtt/spanish/33A.vtt"
  },
  "44C": {
    "index": "132",
    "waltz": "44C",
    "movement": null,
    "webvtt": "webvtt/spanish/44C.vtt"
  },
  "47A": {
    "index": "139",
    "waltz": "47A",
    "movement": null,
    "webvtt": "webvtt/spanish/47A.vtt"
  }
};

waltzLocationAndMovementData = {
  "locations": [
    {
      "address": "Fenkell St & Wisconsin St",
      "latitude": 42.40155299647829,
      "longitude": -83.19715099960311,
      "movements": [
        1
      ]
    },
    {
      "address": "Westfield St & Decater St",
      "latitude": 42.36351299988622,
      "longitude": -83.18004599990013,
      "movements": [
        2
      ]
    },
    {
      "address": "ElmiraSt & Crosley St",
      "latitude": 42.36852899997066,
      "longitude": -83.28872799977619,
      "movements": [
        3
      ]
    },
    {
      "address": "Claremont St & Meridan St",
      "latitude": 42.30464200083297,
      "longitude": -83.27319699981251,
      "movements": [
        4
      ]
    },
    {
      "address": "Dexter St & Waverly St",
      "latitude": 42.38911199948529,
      "longitude": -83.13044100005347,
      "movements": [
        5
      ]
    },
    {
      "address": "Westfield St & Robson St",
      "latitude": 42.36357299953896,
      "longitude": -83.19176700068064,
      "movements": [
        6
      ]
    },
    {
      "address": "E Warren St & Crysler St",
      "latitude": 42.36031899950657,
      "longitude": -83.05527700012037,
      "movements": [
        7
      ]
    },
    {
      "address": "Temple St & Woodward Ave",
      "latitude": 42.34326927436499,
      "longitude": -83.05508759630352,
      "movements": [
        8
      ]
    },
    {
      "address": "Wagner St & Florida St",
      "latitude": 42.33734700024711,
      "longitude": -83.14112200006522,
      "movements": [
        9
      ]
    },
    {
      "address": "Hancock St & 24th St",
      "latitude": 42.34381499973764,
      "longitude": -83.09997699995839,
      "movements": [
        10
      ]
    },
    {
      "address": "Newmark St & 16th St",
      "latitude": 42.32679199977638,
      "longitude": -83.07759100024275,
      "movements": [
        11,
        144
      ]
    },
    {
      "address": "Atwater St & Rivard St",
      "latitude": 42.33103599948328,
      "longitude": -83.03270200006187,
      "movements": [
        12,
        87
      ]
    },
    {
      "address": "Compass St & Ward St",
      "latitude": 42.3890459995314,
      "longitude": -83.17312400020359,
      "movements": [
        13
      ]
    },
    {
      "address": "Wyoming St & Marvin Ave",
      "latitude": 42.32452800046415,
      "longitude": -83.15650100042811,
      "movements": [
        14
      ]
    },
    {
      "address": "Trinity St & Westfield St",
      "latitude": 42.36268200085853,
      "longitude": -83.24716899954403,
      "movements": [
        15
      ]
    },
    {
      "address": "W Davison St & Asbury St",
      "latitude": 42.38465000231012,
      "longitude": -83.2076579988,
      "movements": [
        16
      ]
    },
    {
      "address": "Woodrow Wilson St & Glendale",
      "latitude": 42.3942710001687,
      "longitude": -83.10891800033359,
      "movements": [
        17
      ]
    },
    {
      "address": "Burt St & Outer Drive",
      "latitude": 42.39773399776939,
      "longitude": -83.2470180005802,
      "movements": [
        18
      ]
    },
    {
      "address": "Outer Drive & Cobb",
      "latitude": 42.32496399994129,
      "longitude": -83.26127699943285,
      "movements": [
        19
      ]
    },
    {
      "address": "Westfield St & Grandmont St",
      "latitude": 42.3633279964756,
      "longitude": -83.209312997093,
      "movements": [
        20
      ]
    },
    {
      "address": "N. Telegraph St & Ford Rd",
      "latitude": 42.32707599901273,
      "longitude": -83.27241600075476,
      "movements": [
        21
      ]
    },
    {
      "address": "W Warren St & 14th St",
      "latitude": 42.34953000019629,
      "longitude": -83.08683799988549,
      "movements": [
        22
      ]
    },
    {
      "address": " Clark St So.of Michigan St",
      "latitude": 42.33134899933064,
      "longitude": -83.10194200010609,
      "movements": [
        23
      ]
    },
    {
      "address": "Cherry Hill Rd & N Telegraph Rd",
      "latitude": 42.31257300075557,
      "longitude": -83.27174399975821,
      "movements": [
        24
      ]
    },
    {
      "address": "Livornois Ave & Oakman Blvd",
      "latitude": 42.39124195092288,
      "longitude": -83.13968028925652,
      "movements": [
        25
      ]
    },
    {
      "address": "Grand River Ave & Wyoming St",
      "latitude": 42.3766869996977,
      "longitude": -83.15868200007414,
      "movements": [
        26
      ]
    },
    {
      "address": "Midland St & Kentucky St",
      "latitude": 42.4061200001986,
      "longitude": -83.15877499979793,
      "movements": [
        27
      ]
    },
    {
      "address": "Belton Ave & Riverview Drive",
      "latitude": 42.35151700133084,
      "longitude": -83.27137200270901,
      "movements": [
        28
      ]
    },
    {
      "address": "W Fort St & St. Anne St",
      "latitude": 42.3186730002659,
      "longitude": -83.07603500006113,
      "movements": [
        29
      ]
    },
    {
      "address": "W Chicago St & Dale St",
      "latitude": 42.36248452650962,
      "longitude": -83.27162816607407,
      "movements": [
        30
      ]
    },
    {
      "address": "Hoover  St & E. State Fair St",
      "latitude": 42.44167900045184,
      "longitude": -83.00496400012469,
      "movements": [
        31
      ]
    },
    {
      "address": "Hamilton St & W Chicago Blvd",
      "latitude": 42.38318000020946,
      "longitude": -83.09315499995122,
      "movements": [
        32
      ]
    },
    {
      "address": "Dequindre St & 8 Mile Rd",
      "latitude": 42.44730200043431,
      "longitude": -83.08345799992043,
      "movements": [
        33
      ]
    },
    {
      "address": "Hayes St & E State Fair St",
      "latitude": 42.44267700009971,
      "longitude": -82.96573000001177,
      "movements": [
        34
      ]
    },
    {
      "address": "Eldon St & Doyle St",
      "latitude": 42.41711999951693,
      "longitude": -83.02667800005048,
      "movements": [
        35
      ]
    },
    {
      "address": "Linville St & Manistique St",
      "latitude": 42.40310100042002,
      "longitude": -82.96011199989404,
      "movements": [
        36
      ]
    },
    {
      "address": "State Fair St & Dequindre St",
      "latitude": 42.44006000070473,
      "longitude": -83.083100000006,
      "movements": [
        37
      ]
    },
    {
      "address": "St Auben St & Modern St",
      "latitude": 42.41530200004881,
      "longitude": -83.07927899997847,
      "movements": [
        38
      ]
    },
    {
      "address": "Bliss St & Outer Drive ",
      "latitude": 42.43737200033976,
      "longitude": -83.01506600017426,
      "movements": [
        39
      ]
    },
    {
      "address": "Nancy St & Healey St",
      "latitude": 42.42094900023979,
      "longitude": -83.05492799986715,
      "movements": [
        40,
        118
      ]
    },
    {
      "address": "Sears St & Woodward",
      "latitude": 42.40970400053666,
      "longitude": -83.0998889999185,
      "movements": [
        41
      ]
    },
    {
      "address": "Balfour Rd & St Paul Ave",
      "latitude": 42.38104900028463,
      "longitude": -82.93412399986933,
      "movements": [
        42
      ]
    },
    {
      "address": "Trombly St & Russell St",
      "latitude": 42.37283080841846,
      "longitude": -83.05810322959418,
      "movements": [
        43
      ]
    },
    {
      "address": "Ferry St & Van Dyke St",
      "latitude": 42.38019499971277,
      "longitude": -83.01567500013722,
      "movements": [
        44
      ]
    },
    {
      "address": "Blue Heron Lagoon, Belle Isle",
      "latitude": 42.34659099999806,
      "longitude": -82.95889300000916,
      "movements": [
        45
      ]
    },
    {
      "address": "Winder St & Market St",
      "latitude": 42.34625200024194,
      "longitude": -83.03919400001928,
      "movements": [
        46
      ]
    },
    {
      "address": "Holbrook St & St Aubin St ",
      "latitude": 42.39040000014592,
      "longitude": -83.06192800001301,
      "movements": [
        47
      ]
    },
    {
      "address": "Harper Ave & Vernier Rd",
      "latitude": 42.44572500058302,
      "longitude": -82.91680600011784,
      "movements": [
        48
      ]
    },
    {
      "address": "8 mile Rd & Schoenherr St",
      "latitude": 42.44958199972849,
      "longitude": -82.98567299963199,
      "movements": [
        49
      ]
    },
    {
      "address": "Linwood St & Monterey St",
      "latitude": 42.38531299979817,
      "longitude": -83.11679700003356,
      "movements": [
        50
      ]
    },
    {
      "address": "Orleans St & Fisher Hwy",
      "latitude": 42.30715999990805,
      "longitude": -83.10488099992986,
      "movements": [
        51
      ]
    },
    {
      "address": "Houston Whittier Ave & Kelly Rd",
      "latitude": 42.4210849996162,
      "longitude": -82.9631910001606,
      "movements": [
        52
      ]
    },
    {
      "address": "Binder St & Winchester Ave",
      "latitude": 42.44517099961777,
      "longitude": -83.06483199984756,
      "movements": [
        53
      ]
    },
    {
      "address": "Linville  St & Canyon Ave",
      "latitude": 42.41784699978387,
      "longitude": -82.91959500005777,
      "movements": [
        54
      ]
    },
    {
      "address": "McGraw St and Military",
      "latitude": 42.34127599969346,
      "longitude": -83.1262329999358,
      "movements": [
        55,
        94
      ]
    },
    {
      "address": "East Canfield & Montclair St",
      "latitude": 42.38099200007549,
      "longitude": -82.98667800015205,
      "movements": [
        56
      ]
    },
    {
      "address": "Joeseph Campau St and McNichols Rd ",
      "latitude": 42.41861799987407,
      "longitude": -83.07258800006339,
      "movements": [
        57
      ]
    },
    {
      "address": "Belle Isle, Conservatory Drive",
      "latitude": 42.33651696121481,
      "longitude": -82.98561937184266,
      "movements": [
        58
      ]
    },
    {
      "address": "Vermont St & Bagley Ave",
      "latitude": 42.32745999953098,
      "longitude": -83.07138499988446,
      "movements": [
        59
      ]
    },
    {
      "address": "State Fair St & Kelly Rd",
      "latitude": 42.44286700014818,
      "longitude": -82.94667400008134,
      "movements": [
        60
      ]
    },
    {
      "address": "E Nevada St and Conant St",
      "latitude": 42.42583399976355,
      "longitude": -83.06861200019804,
      "movements": [
        61
      ]
    },
    {
      "address": "W Warren & Rosa Parks Blvd",
      "latitude": 42.35073899983907,
      "longitude": -83.08296500012449,
      "movements": [
        62
      ]
    },
    {
      "address": "McNichols Rd & Greenfield Rd",
      "latitude": 42.41598400029419,
      "longitude": -83.19930999824338,
      "movements": [
        63
      ]
    },
    {
      "address": "Hamilton Ave & Glendale St",
      "latitude": 42.39628400029622,
      "longitude": -83.10203100016876,
      "movements": [
        64
      ]
    },
    {
      "address": "Mt.Elliott St & Huber St",
      "latitude": 42.39750300058596,
      "longitude": -83.03756599994571,
      "movements": [
        65
      ]
    },
    {
      "address": "Hubell St &  Eaton Ave",
      "latitude": 42.39698500179107,
      "longitude": -83.18870800158433,
      "movements": [
        66
      ]
    },
    {
      "address": "Vicksberg  St & Holmur St",
      "latitude": 42.36162599972247,
      "longitude": -83.11471300019893,
      "movements": [
        67
      ]
    },
    {
      "address": "Florida St & Kirkwood St",
      "latitude": 42.33869959914298,
      "longitude": -83.14405574461176,
      "movements": [
        68
      ]
    },
    {
      "address": "Ford Rd  & Mead Ave",
      "latitude": 42.32923699922333,
      "longitude": -83.19029099762243,
      "movements": [
        69
      ]
    },
    {
      "address": "West Grand Blvd  & 2nd Ave I",
      "latitude": 42.36903199994403,
      "longitude": -83.07690100015705,
      "movements": [
        70
      ]
    },
    {
      "address": "Van Dyke Ave & Lynch Rd",
      "latitude": 42.40429339892395,
      "longitude": -83.02412715482878,
      "movements": [
        71
      ]
    },
    {
      "address": "John R St & Ferry St",
      "latitude": 42.36193800005716,
      "longitude": -83.06497100022261,
      "movements": [
        72
      ]
    },
    {
      "address": "McNichols Rd & Linwood ",
      "latitude": 42.41734900020686,
      "longitude": -83.1281380002241,
      "movements": [
        73
      ]
    },
    {
      "address": "Glendale St & Archdale St",
      "latitude": 42.38217425758403,
      "longitude": -83.2158281921073,
      "movements": [
        74
      ]
    },
    {
      "address": "Charles St & Mt Elliot St",
      "latitude": 42.41197399965843,
      "longitude": -83.0381110000215,
      "movements": [
        75
      ]
    },
    {
      "address": "St. Lawrence St & Kirkwood St",
      "latitude": 42.33938269187551,
      "longitude": -83.15226212774512,
      "movements": [
        76
      ]
    },
    {
      "address": "Linwood  & Monterey Ave  ",
      "latitude": 42.3851899997126,
      "longitude": -83.11670999998597,
      "movements": [
        77
      ]
    },
    {
      "address": "Norfolk St & Santa Barbara Drive",
      "latitude": 42.44198277528118,
      "longitude": -83.1487169079399,
      "movements": [
        78
      ]
    },
    {
      "address": "Davison St & Mt.Elliot St",
      "latitude": 42.42326699990885,
      "longitude": -83.03850100001917,
      "movements": [
        79
      ]
    },
    {
      "address": "Cardoni St & State Fair",
      "latitude": 42.43984499978433,
      "longitude": -83.09181799984513,
      "movements": [
        80
      ]
    },
    {
      "address": "Mark Twain St & Clarita Ave",
      "latitude": 42.42901500039066,
      "longitude": -83.18755999993472,
      "movements": [
        81
      ]
    },
    {
      "address": "Hessell Ave & Ashton Ave",
      "latitude": 42.44256499871326,
      "longitude": -83.22124500066663,
      "movements": [
        82
      ]
    },
    {
      "address": "Ford Rd & Aubern St",
      "latitude": 42.33102700009829,
      "longitude": -83.2324600056449,
      "movements": [
        83
      ]
    },
    {
      "address": "Paul Drive & Artesian St",
      "latitude": 42.33600100097579,
      "longitude": -83.22540000006823,
      "movements": [
        84
      ]
    },
    {
      "address": "Trumball St & Leverette St",
      "latitude": 42.33031200058889,
      "longitude": -83.06614699990772,
      "movements": [
        85
      ]
    },
    {
      "address": "Woodward Ave & Willis Ave",
      "latitude": 42.35166400024188,
      "longitude": -83.06072199993076,
      "movements": [
        86
      ]
    },
    {
      "address": "Southfield Rd & Cambridge",
      "latitude": 42.43182799687845,
      "longitude": -83.21894800126006,
      "movements": [
        88
      ]
    },
    {
      "address": "Fort St & Powell St",
      "latitude": 42.28868300001316,
      "longitude": -83.14464499982302,
      "movements": [
        89
      ]
    },
    {
      "address": "Outer Drive & Conley St",
      "latitude": 42.44074200041899,
      "longitude": -83.05299299964948,
      "movements": [
        90
      ]
    },
    {
      "address": "Norfolk St & Santa Barbara Drive",
      "latitude": 42.44352599962425,
      "longitude": -83.14923599997684,
      "movements": [
        91
      ]
    },
    {
      "address": "Yinger St  & Tireman St",
      "latitude": 42.35091000060028,
      "longitude": -83.1954999990981,
      "movements": [
        92
      ]
    },
    {
      "address": "Clairmount St & 14th St",
      "latitude": 42.37511700017556,
      "longitude": -83.10288599996463,
      "movements": [
        93
      ]
    },
    {
      "address": "8 mile & Mound Rd",
      "latitude": 42.44768199992901,
      "longitude": -83.04407599992142,
      "movements": [
        95
      ]
    },
    {
      "address": "Collingwood St & Lawton St",
      "latitude": 42.37938099968073,
      "longitude": -83.11622300008086,
      "movements": [
        96
      ]
    },
    {
      "address": "Dequindre St & E. Forest Ave",
      "latitude": 42.36143100024103,
      "longitude": -83.04543300004686,
      "movements": [
        97
      ]
    },
    {
      "address": "Lonyo St & McGraw St",
      "latitude": 42.33321899975826,
      "longitude": -83.14639899998575,
      "movements": [
        98
      ]
    },
    {
      "address": "Rochester St & Dexter Ave",
      "latitude": 42.37415200025217,
      "longitude": -83.1203370001711,
      "movements": [
        99,
        110
      ]
    },
    {
      "address": "7 mile & Van Dyke St",
      "latitude": 42.43374799949756,
      "longitude": -83.02448800019964,
      "movements": [
        100
      ]
    },
    {
      "address": "E. Forest Ave & Chene St",
      "latitude": 42.36360399936944,
      "longitude": -83.03938399989472,
      "movements": [
        101
      ]
    },
    {
      "address": "Washburn St & W Buena Vista St",
      "latitude": 42.38361900012613,
      "longitude": -83.15996599992485,
      "movements": [
        102
      ]
    },
    {
      "address": "Lyndon St & Schaeffer Hwy",
      "latitude": 42.3948270002257,
      "longitude": -83.1787889998597,
      "movements": [
        103
      ]
    },
    {
      "address": "Shields & Luce",
      "latitude": 42.41516700023593,
      "longitude": -83.05681799970226,
      "movements": [
        104
      ]
    },
    {
      "address": "Kendell St & Lincoln St",
      "latitude": 42.40309700047916,
      "longitude": -83.10937100016581,
      "movements": [
        105
      ]
    },
    {
      "address": "7 mile & Ponchartrain Blvd",
      "latitude": 42.43198199956611,
      "longitude": -83.12590400012859,
      "movements": [
        106
      ]
    },
    {
      "address": "Woodbridge St & Adair St",
      "latitude": 42.34104599976487,
      "longitude": -83.0140210000594,
      "movements": [
        107
      ]
    },
    {
      "address": "Evergreen Cemetery",
      "latitude": 42.43881909037404,
      "longitude": -83.11982154167518,
      "movements": [
        108
      ]
    },
    {
      "address": "Mound Rd & Emory",
      "latitude": 42.43608900000307,
      "longitude": -83.04351999984296,
      "movements": [
        109
      ]
    },
    {
      "address": "Greenfield & Vasser",
      "latitude": 42.43399499973555,
      "longitude": -83.20001100008311,
      "movements": [
        111
      ]
    },
    {
      "address": "Archdale & Capitol",
      "latitude": 42.37689444591156,
      "longitude": -83.21634695814919,
      "movements": [
        112
      ]
    },
    {
      "address": "Warren & Woodward Ave",
      "latitude": 42.35642199953367,
      "longitude": -83.06422800006143,
      "movements": [
        113
      ]
    },
    {
      "address": "St Joseph & McDougal",
      "latitude": 42.35897399974154,
      "longitude": -83.0302099997832,
      "movements": [
        114
      ]
    },
    {
      "address": "John R St & Belmont detroit MI",
      "latitude": 42.3897290001886,
      "longitude": -83.08261799995869,
      "movements": [
        115
      ]
    },
    {
      "address": "Chicago & Dexter",
      "latitude": 42.3728745419579,
      "longitude": -83.12005356812321,
      "movements": [
        116
      ]
    },
    {
      "address": "8 mile & Livernois Ave",
      "latitude": 42.44607999992481,
      "longitude": -83.14212000022992,
      "movements": [
        117
      ]
    },
    {
      "address": "E Warren & Maxwell",
      "latitude": 42.37674100007403,
      "longitude": -83.01063500017707,
      "movements": [
        119
      ]
    },
    {
      "address": "Buffalo & Prescott",
      "latitude": 42.40551500005524,
      "longitude": -83.04728100035332,
      "movements": [
        120
      ]
    },
    {
      "address": "Fenkell St & Meyers",
      "latitude": 42.40224099954452,
      "longitude": -83.16940400005706,
      "movements": [
        121
      ]
    },
    {
      "address": "E Grand Blvd & Canton PL",
      "latitude": 42.37900899984702,
      "longitude": -83.02564699932897,
      "movements": [
        122
      ]
    },
    {
      "address": "Oakman Blvd & Livernois Ave",
      "latitude": 42.39034699968187,
      "longitude": -83.13959000017277,
      "movements": [
        123
      ]
    },
    {
      "address": "Miller Rd & Michigan",
      "latitude": 42.32499300037392,
      "longitude": -83.16624199997311,
      "movements": [
        124
      ]
    },
    {
      "address": "Dequindre St & E Warren",
      "latitude": 42.36294699911957,
      "longitude": -83.04748799996298,
      "movements": [
        125
      ]
    },
    {
      "address": "Bauman & Adeline",
      "latitude": 42.43851600017746,
      "longitude": -83.1123269999117,
      "movements": [
        126
      ]
    },
    {
      "address": "Schoolcraft & Kentucky",
      "latitude": 42.38851400001469,
      "longitude": -83.1580500000256,
      "movements": [
        127
      ]
    },
    {
      "address": "Nancy St & Conley St",
      "latitude": 42.42101800018857,
      "longitude": -83.05175800005826,
      "movements": [
        128
      ]
    },
    {
      "address": "Abbott & 3rd Street",
      "latitude": 42.33014300004895,
      "longitude": -83.05653099984886,
      "movements": [
        129
      ]
    },
    {
      "address": "Hamburg & Greiner",
      "latitude": 42.42739499996988,
      "longitude": -82.9969850000752,
      "movements": [
        130
      ]
    },
    {
      "address": "Trombly St & Russell St",
      "latitude": 42.37285600713653,
      "longitude": -83.05806648025752,
      "movements": [
        131
      ]
    },
    {
      "address": "Canfield & Belvedere",
      "latitude": 42.37680299961395,
      "longitude": -82.99880400007848,
      "movements": [
        132
      ]
    },
    {
      "address": "14th St & Michigan",
      "latitude": 42.33137100056508,
      "longitude": -83.07642699978604,
      "movements": [
        133,
        136
      ]
    },
    {
      "address": "Meyers & Lyndon",
      "latitude": 42.39502600019242,
      "longitude": -83.16904699995031,
      "movements": [
        134,
        142
      ]
    },
    {
      "address": "E Grand Blvd & Canton Pl",
      "latitude": 42.37900899929972,
      "longitude": -83.02564699989648,
      "movements": [
        135
      ]
    },
    {
      "address": "Clarita & Stoepple",
      "latitude": 42.42980899978779,
      "longitude": -83.14249400026158,
      "movements": [
        137
      ]
    },
    {
      "address": "Woodward & Golden Gate",
      "latitude": 42.42888599981462,
      "longitude": -83.11279099995993,
      "movements": [
        138
      ]
    },
    {
      "address": "Fountain Way, Belle Isle,",
      "latitude": 42.33454800024089,
      "longitude": -82.99905500018642,
      "movements": [
        139
      ]
    },
    {
      "address": "Yacama Road & Lance",
      "latitude": 42.43731499967507,
      "longitude": -83.09712000005192,
      "movements": [
        140
      ]
    },
    {
      "address": "8 mile & Durham",
      "latitude": 42.44632999996846,
      "longitude": -83.13043800000176,
      "movements": [
        141
      ]
    },
    {
      "address": "Orleans & Milwaukee",
      "latitude": 42.37528499980619,
      "longitude": -83.05578599998296,
      "movements": [
        143
      ]
    },
    {
      "address": "E Grand & Forest  street",
      "latitude": 42.37143599997896,
      "longitude": -83.01791300002417,
      "movements": [
        145
      ]
    },
    {
      "address": "23rd Street & W Vernor",
      "latitude": 42.32434899942687,
      "longitude": -83.08547800007419,
      "movements": [
        146
      ]
    },
    {
      "address": "E Warren & Grandy",
      "latitude": 42.36642999932583,
      "longitude": -83.03872900018635,
      "movements": [
        147
      ]
    }
  ],
  "movements": [
    {
      "index": 1,
      "waltz": 1,
      "movement": "A",
      "location": 0
    },
    {
      "index": 2,
      "waltz": 1,
      "movement": "B",
      "location": 1
    },
    {
      "index": 3,
      "waltz": 1,
      "movement": "C",
      "location": 2
    },
    {
      "index": 4,
      "waltz": 2,
      "movement": "A",
      "location": 3
    },
    {
      "index": 5,
      "waltz": 2,
      "movement": "B",
      "location": 4
    },
    {
      "index": 6,
      "waltz": 2,
      "movement": "C",
      "location": 5
    },
    {
      "index": 7,
      "waltz": 3,
      "movement": "A",
      "location": 6
    },
    {
      "index": 8,
      "waltz": 3,
      "movement": "B",
      "location": 7
    },
    {
      "index": 9,
      "waltz": 3,
      "movement": "C",
      "location": 8
    },
    {
      "index": 10,
      "waltz": 4,
      "movement": "A",
      "location": 9
    },
    {
      "index": 11,
      "waltz": 4,
      "movement": "B",
      "location": 10
    },
    {
      "index": 12,
      "waltz": 4,
      "movement": "C",
      "location": 11
    },
    {
      "index": 13,
      "waltz": 5,
      "movement": "A",
      "location": 12
    },
    {
      "index": 14,
      "waltz": 5,
      "movement": "B",
      "location": 13
    },
    {
      "index": 15,
      "waltz": 5,
      "movement": "C",
      "location": 14
    },
    {
      "index": 16,
      "waltz": 6,
      "movement": "A",
      "location": 15
    },
    {
      "index": 17,
      "waltz": 6,
      "movement": "B",
      "location": 16
    },
    {
      "index": 18,
      "waltz": 6,
      "movement": "C",
      "location": 17
    },
    {
      "index": 19,
      "waltz": 7,
      "movement": "A",
      "location": 18
    },
    {
      "index": 20,
      "waltz": 7,
      "movement": "B",
      "location": 19
    },
    {
      "index": 21,
      "waltz": 7,
      "movement": "C",
      "location": 20
    },
    {
      "index": 22,
      "waltz": 8,
      "movement": "A",
      "location": 21
    },
    {
      "index": 23,
      "waltz": 8,
      "movement": "B",
      "location": 22
    },
    {
      "index": 24,
      "waltz": 8,
      "movement": "C",
      "location": 23
    },
    {
      "index": 25,
      "waltz": 9,
      "movement": "A",
      "location": 24
    },
    {
      "index": 26,
      "waltz": 9,
      "movement": "B",
      "location": 25
    },
    {
      "index": 27,
      "waltz": 9,
      "movement": "C",
      "location": 26
    },
    {
      "index": 28,
      "waltz": 10,
      "movement": "A",
      "location": 27
    },
    {
      "index": 29,
      "waltz": 10,
      "movement": "B",
      "location": 28
    },
    {
      "index": 30,
      "waltz": 10,
      "movement": "C",
      "location": 29
    },
    {
      "index": 31,
      "waltz": 11,
      "movement": "A",
      "location": 30
    },
    {
      "index": 32,
      "waltz": 11,
      "movement": "B",
      "location": 31
    },
    {
      "index": 33,
      "waltz": 11,
      "movement": "C",
      "location": 32
    },
    {
      "index": 34,
      "waltz": 12,
      "movement": "A",
      "location": 33
    },
    {
      "index": 35,
      "waltz": 12,
      "movement": "B",
      "location": 34
    },
    {
      "index": 36,
      "waltz": 12,
      "movement": "C",
      "location": 35
    },
    {
      "index": 37,
      "waltz": 13,
      "movement": "A",
      "location": 36
    },
    {
      "index": 38,
      "waltz": 13,
      "movement": "B",
      "location": 37
    },
    {
      "index": 39,
      "waltz": 13,
      "movement": "C",
      "location": 38
    },
    {
      "index": 40,
      "waltz": 14,
      "movement": "A",
      "location": 39
    },
    {
      "index": 41,
      "waltz": 14,
      "movement": "B",
      "location": 40
    },
    {
      "index": 42,
      "waltz": 14,
      "movement": "C",
      "location": 41
    },
    {
      "index": 43,
      "waltz": 15,
      "movement": "A",
      "location": 42
    },
    {
      "index": 44,
      "waltz": 15,
      "movement": "B",
      "location": 43
    },
    {
      "index": 45,
      "waltz": 15,
      "movement": "C",
      "location": 44
    },
    {
      "index": 46,
      "waltz": 16,
      "movement": "A",
      "location": 45
    },
    {
      "index": 47,
      "waltz": 16,
      "movement": "B",
      "location": 46
    },
    {
      "index": 48,
      "waltz": 16,
      "movement": "C",
      "location": 47
    },
    {
      "index": 49,
      "waltz": 17,
      "movement": "A",
      "location": 48
    },
    {
      "index": 50,
      "waltz": 17,
      "movement": "B",
      "location": 49
    },
    {
      "index": 51,
      "waltz": 17,
      "movement": "C",
      "location": 50
    },
    {
      "index": 52,
      "waltz": 18,
      "movement": "A",
      "location": 51
    },
    {
      "index": 53,
      "waltz": 18,
      "movement": "B",
      "location": 52
    },
    {
      "index": 54,
      "waltz": 18,
      "movement": "C",
      "location": 53
    },
    {
      "index": 55,
      "waltz": 19,
      "movement": "A",
      "location": 54
    },
    {
      "index": 56,
      "waltz": 19,
      "movement": "B",
      "location": 55
    },
    {
      "index": 57,
      "waltz": 19,
      "movement": "C",
      "location": 56
    },
    {
      "index": 58,
      "waltz": 20,
      "movement": "A",
      "location": 57
    },
    {
      "index": 59,
      "waltz": 20,
      "movement": "B",
      "location": 58
    },
    {
      "index": 60,
      "waltz": 20,
      "movement": "C",
      "location": 59
    },
    {
      "index": 61,
      "waltz": 21,
      "movement": "A",
      "location": 60
    },
    {
      "index": 62,
      "waltz": 21,
      "movement": "B",
      "location": 61
    },
    {
      "index": 63,
      "waltz": 21,
      "movement": "C",
      "location": 62
    },
    {
      "index": 64,
      "waltz": 22,
      "movement": "A",
      "location": 63
    },
    {
      "index": 65,
      "waltz": 22,
      "movement": "B",
      "location": 64
    },
    {
      "index": 66,
      "waltz": 22,
      "movement": "C",
      "location": 65
    },
    {
      "index": 67,
      "waltz": 23,
      "movement": "A",
      "location": 66
    },
    {
      "index": 68,
      "waltz": 23,
      "movement": "B",
      "location": 67
    },
    {
      "index": 69,
      "waltz": 23,
      "movement": "C",
      "location": 68
    },
    {
      "index": 70,
      "waltz": 24,
      "movement": "A",
      "location": 69
    },
    {
      "index": 71,
      "waltz": 24,
      "movement": "B",
      "location": 70
    },
    {
      "index": 72,
      "waltz": 24,
      "movement": "C",
      "location": 71
    },
    {
      "index": 73,
      "waltz": 25,
      "movement": "A",
      "location": 72
    },
    {
      "index": 74,
      "waltz": 25,
      "movement": "B",
      "location": 73
    },
    {
      "index": 75,
      "waltz": 25,
      "movement": "C",
      "location": 74
    },
    {
      "index": 76,
      "waltz": 26,
      "movement": "A",
      "location": 75
    },
    {
      "index": 77,
      "waltz": 26,
      "movement": "B",
      "location": 76
    },
    {
      "index": 78,
      "waltz": 26,
      "movement": "C",
      "location": 77
    },
    {
      "index": 79,
      "waltz": 27,
      "movement": "A",
      "location": 78
    },
    {
      "index": 80,
      "waltz": 27,
      "movement": "B",
      "location": 79
    },
    {
      "index": 81,
      "waltz": 27,
      "movement": "C",
      "location": 80
    },
    {
      "index": 82,
      "waltz": 28,
      "movement": "A",
      "location": 81
    },
    {
      "index": 83,
      "waltz": 28,
      "movement": "B",
      "location": 82
    },
    {
      "index": 84,
      "waltz": 28,
      "movement": "C",
      "location": 83
    },
    {
      "index": 85,
      "waltz": 29,
      "movement": "A",
      "location": 84
    },
    {
      "index": 86,
      "waltz": 29,
      "movement": "B",
      "location": 85
    },
    {
      "index": 87,
      "waltz": 29,
      "movement": "C",
      "location": 11
    },
    {
      "index": 88,
      "waltz": 30,
      "movement": "A",
      "location": 86
    },
    {
      "index": 89,
      "waltz": 30,
      "movement": "B",
      "location": 87
    },
    {
      "index": 90,
      "waltz": 30,
      "movement": "C",
      "location": 88
    },
    {
      "index": 91,
      "waltz": 31,
      "movement": "A",
      "location": 89
    },
    {
      "index": 92,
      "waltz": 31,
      "movement": "B",
      "location": 90
    },
    {
      "index": 93,
      "waltz": 31,
      "movement": "C",
      "location": 91
    },
    {
      "index": 94,
      "waltz": 32,
      "movement": "A",
      "location": 54
    },
    {
      "index": 95,
      "waltz": 32,
      "movement": "B",
      "location": 92
    },
    {
      "index": 96,
      "waltz": 32,
      "movement": "C",
      "location": 93
    },
    {
      "index": 97,
      "waltz": 33,
      "movement": "A",
      "location": 94
    },
    {
      "index": 98,
      "waltz": 33,
      "movement": "B",
      "location": 95
    },
    {
      "index": 99,
      "waltz": 33,
      "movement": "C",
      "location": 96
    },
    {
      "index": 100,
      "waltz": 34,
      "movement": "A",
      "location": 97
    },
    {
      "index": 101,
      "waltz": 34,
      "movement": "B",
      "location": 98
    },
    {
      "index": 102,
      "waltz": 34,
      "movement": "C",
      "location": 99
    },
    {
      "index": 103,
      "waltz": 35,
      "movement": "A",
      "location": 100
    },
    {
      "index": 104,
      "waltz": 35,
      "movement": "B",
      "location": 101
    },
    {
      "index": 105,
      "waltz": 35,
      "movement": "C",
      "location": 102
    },
    {
      "index": 106,
      "waltz": 36,
      "movement": "A",
      "location": 103
    },
    {
      "index": 107,
      "waltz": 36,
      "movement": "B",
      "location": 104
    },
    {
      "index": 108,
      "waltz": 36,
      "movement": "C",
      "location": 105
    },
    {
      "index": 109,
      "waltz": 37,
      "movement": "A",
      "location": 106
    },
    {
      "index": 110,
      "waltz": 37,
      "movement": "B",
      "location": 96
    },
    {
      "index": 111,
      "waltz": 37,
      "movement": "C",
      "location": 107
    },
    {
      "index": 112,
      "waltz": 38,
      "movement": "A",
      "location": 108
    },
    {
      "index": 113,
      "waltz": 38,
      "movement": "B",
      "location": 109
    },
    {
      "index": 114,
      "waltz": 38,
      "movement": "C",
      "location": 110
    },
    {
      "index": 115,
      "waltz": 39,
      "movement": "A",
      "location": 111
    },
    {
      "index": 116,
      "waltz": 39,
      "movement": "B",
      "location": 112
    },
    {
      "index": 117,
      "waltz": 39,
      "movement": "C",
      "location": 113
    },
    {
      "index": 118,
      "waltz": 40,
      "movement": "A",
      "location": 39
    },
    {
      "index": 119,
      "waltz": 40,
      "movement": "B",
      "location": 114
    },
    {
      "index": 120,
      "waltz": 40,
      "movement": "C",
      "location": 115
    },
    {
      "index": 121,
      "waltz": 41,
      "movement": "A",
      "location": 116
    },
    {
      "index": 122,
      "waltz": 41,
      "movement": "B",
      "location": 117
    },
    {
      "index": 123,
      "waltz": 41,
      "movement": "C",
      "location": 118
    },
    {
      "index": 124,
      "waltz": 42,
      "movement": "A",
      "location": 119
    },
    {
      "index": 125,
      "waltz": 42,
      "movement": "B",
      "location": 120
    },
    {
      "index": 126,
      "waltz": 42,
      "movement": "C",
      "location": 121
    },
    {
      "index": 127,
      "waltz": 43,
      "movement": "A",
      "location": 122
    },
    {
      "index": 128,
      "waltz": 43,
      "movement": "B",
      "location": 123
    },
    {
      "index": 129,
      "waltz": 43,
      "movement": "C",
      "location": 124
    },
    {
      "index": 130,
      "waltz": 44,
      "movement": "A",
      "location": 125
    },
    {
      "index": 131,
      "waltz": 44,
      "movement": "B",
      "location": 126
    },
    {
      "index": 132,
      "waltz": 44,
      "movement": "C",
      "location": 127
    },
    {
      "index": 133,
      "waltz": 45,
      "movement": "A",
      "location": 128
    },
    {
      "index": 134,
      "waltz": 45,
      "movement": "B",
      "location": 129
    },
    {
      "index": 135,
      "waltz": 45,
      "movement": "C",
      "location": 130
    },
    {
      "index": 136,
      "waltz": 46,
      "movement": "A",
      "location": 128
    },
    {
      "index": 137,
      "waltz": 46,
      "movement": "B",
      "location": 131
    },
    {
      "index": 138,
      "waltz": 46,
      "movement": "C",
      "location": 132
    },
    {
      "index": 139,
      "waltz": 47,
      "movement": "A",
      "location": 133
    },
    {
      "index": 140,
      "waltz": 47,
      "movement": "B",
      "location": 134
    },
    {
      "index": 141,
      "waltz": 47,
      "movement": "C",
      "location": 135
    },
    {
      "index": 142,
      "waltz": 48,
      "movement": "A",
      "location": 129
    },
    {
      "index": 143,
      "waltz": 48,
      "movement": "B",
      "location": 136
    },
    {
      "index": 144,
      "waltz": 48,
      "movement": "C",
      "location": 10
    },
    {
      "index": 145,
      "waltz": 49,
      "movement": "A",
      "location": 137
    },
    {
      "index": 146,
      "waltz": 49,
      "movement": "B",
      "location": 138
    },
    {
      "index": 147,
      "waltz": 49,
      "movement": "C",
      "location": 139
    }
  ]
};
