var mapdata,
    locationdata;

mapdata = {
  "src": "detroit_4887x2748_16_9_aspect_ratio.png",
  "width": 4887,
  "height": 2748,
  "registration": {
    "topleft": {
      "latitude": 42.439265,
      "longitude": -83.290114,
      "x_pixel": 83,
      "y_pixel": 79,
      "address": "Norfolk &amp; Garfield St, Redford Charter Township, MI 48240, USA"
    },
    "bottomright": {
      "latitude": 42.310282,
      "longitude": -82.951882,
      "x_pixel": 4116,
      "y_pixel": 2279,
      "address": "Tecumseh Rd E &amp; Jefferson Blvd, Windsor, ON N8T, Canada"
    }
  }
}

locationdata = [
  {
    "index": 1,
    "waltz": 1,
    "movement": "A",
    "latitude": 42.40155299647829,
    "longitude": -83.19715099960311,
    "address": "Fenkell & Wisconsin"
  },
  {
    "index": 2,
    "waltz": 1,
    "movement": "B",
    "latitude": 42.36351299988622,
    "longitude": -83.18004599990013,
    "address": "Westfield & Decater"
  },
  {
    "index": 3,
    "waltz": 1,
    "movement": "C",
    "latitude": 42.36852899997066,
    "longitude": -83.28872799977619,
    "address": "Elmira & Crosley"
  },
  {
    "index": 4,
    "waltz": 2,
    "movement": "A",
    "latitude": 42.30464200083297,
    "longitude": -83.27319699981251,
    "address": "claremont & meridan detroit"
  },
  {
    "index": 5,
    "waltz": 2,
    "movement": "B",
    "latitude": 42.38911199948529,
    "longitude": -83.13044100005347,
    "address": "dexter & waverly"
  },
  {
    "index": 6,
    "waltz": 2,
    "movement": "C",
    "latitude": 42.36357299953896,
    "longitude": -83.19176700068064,
    "address": "westfield & Robson"
  },
  {
    "index": 7,
    "waltz": 3,
    "movement": "A",
    "latitude": 42.36031899950657,
    "longitude": -83.05527700012037,
    "address": "E Warren & crysler"
  },
  {
    "index": 8,
    "waltz": 3,
    "movement": "B",
    "latitude": 42.36357299953896,
    "longitude": -83.19176700068064,
    "address": "temple &Woodward st Detroit"
  },
  {
    "index": 9,
    "waltz": 3,
    "movement": "C",
    "latitude": 42.33734700024711,
    "longitude": -83.14112200006522,
    "address": "Wagner & florida"
  },
  {
    "index": 10,
    "waltz": 4,
    "movement": "A",
    "latitude": 42.34381499973764,
    "longitude": -83.09997699995839,
    "address": "hancock & 24th St"
  },
  {
    "index": 11,
    "waltz": 4,
    "movement": "B",
    "latitude": 42.32679199977638,
    "longitude": -83.07759100024275,
    "address": "Newmark & 16th Street"
  },
  {
    "index": 12,
    "waltz": 4,
    "movement": "C",
    "latitude": 42.33103599948328,
    "longitude": -83.03270200006187,
    "address": "atwater & Rivard"
  },
  {
    "index": 13,
    "waltz": 5,
    "movement": "A",
    "latitude": 42.3890459995314,
    "longitude": -83.17312400020359,
    "address": "compass & Ward Ave"
  },
  {
    "index": 14,
    "waltz": 5,
    "movement": "B",
    "latitude": 42.32452800046415,
    "longitude": -83.15650100042811,
    "address": "wyoming & marvin ave"
  },
  {
    "index": 15,
    "waltz": 5,
    "movement": "C",
    "latitude": 42.36268200085853,
    "longitude": -83.24716899954403,
    "address": "trinity & westfield"
  },
  {
    "index": 16,
    "waltz": 6,
    "movement": "A",
    "latitude": 42.38465000231012,
    "longitude": -83.2076579988,
    "address": "W Davison & Asbury"
  },
  {
    "index": 17,
    "waltz": 6,
    "movement": "B",
    "latitude": 42.3942710001687,
    "longitude": -83.10891800033359,
    "address": "woodrow wilson & glendale"
  },
  {
    "index": 18,
    "waltz": 6,
    "movement": "C",
    "latitude": 42.39773399776939,
    "longitude": -83.2470180005802,
    "address": "burt & outer drive"
  },
  {
    "index": 19,
    "waltz": 7,
    "movement": "A",
    "latitude": 42.32496399994129,
    "longitude": -83.26127699943285,
    "address": "outer drive & Cobb"
  },
  {
    "index": 20,
    "waltz": 7,
    "movement": "B",
    "latitude": 42.3633279964756,
    "longitude": -83.209312997093,
    "address": "westfield & grandmont"
  },
  {
    "index": 21,
    "waltz": 7,
    "movement": "C",
    "latitude": 42.32707599901273,
    "longitude": -83.27241600075476,
    "address": "telegraph & ford road"
  },
  {
    "index": 22,
    "waltz": 8,
    "movement": "A",
    "latitude": 42.34953000019629,
    "longitude": -83.08683799988549,
    "address": "W Warren & 14th Street"
  },
  {
    "index": 23,
    "waltz": 8,
    "movement": "B",
    "latitude": 42.33134899933064,
    "longitude": -83.10194200010609,
    "address": "michigan & Clark"
  },
  {
    "index": 24,
    "waltz": 8,
    "movement": "C",
    "latitude": 42.31257300075557,
    "longitude": -83.27174399975821,
    "address": "cherry hill road & telegraph"
  },
  {
    "index": 25,
    "waltz": 9,
    "movement": "A",
    "latitude": 42.39124195092288,
    "longitude": -83.13968028925652,
    "address": "Livornois & Oakman Blvd"
  },
  {
    "index": 26,
    "waltz": 9,
    "movement": "B",
    "latitude": 42.3766869996977,
    "longitude": -83.15868200007414,
    "address": "Grand River & Wyoming"
  },
  {
    "index": 27,
    "waltz": 9,
    "movement": "C",
    "latitude": 42.4061200001986,
    "longitude": -83.15877499979793,
    "address": "midland & kentucky St Detroit"
  },
  {
    "index": 28,
    "waltz": 10,
    "movement": "A",
    "latitude": 42.35151700133084,
    "longitude": -83.27137200270901,
    "address": "belton & riverview drive"
  },
  {
    "index": 29,
    "waltz": 10,
    "movement": "B",
    "latitude": 42.3186730002659,
    "longitude": -83.07603500006113,
    "address": "Fort & St. Anne"
  },
  {
    "index": 30,
    "waltz": 10,
    "movement": "C",
    "latitude": 42.36248452650962,
    "longitude": -83.27162816607407,
    "address": "west chicago & Dale"
  },
  {
    "index": 31,
    "waltz": 11,
    "movement": "A",
    "latitude": 42.44167900045184,
    "longitude": -83.00496400012469,
    "address": "Hoover & E. State Fair, Detroit, MI"
  },
  {
    "index": 32,
    "waltz": 11,
    "movement": "B",
    "latitude": 42.38318000020946,
    "longitude": -83.09315499995122,
    "address": "hamilton & W Chicago"
  },
  {
    "index": 33,
    "waltz": 11,
    "movement": "C",
    "latitude": 42.44730200043431,
    "longitude": -83.08345799992043,
    "address": "deQuindre & 8 Mile Rd"
  },
  {
    "index": 34,
    "waltz": 12,
    "movement": "A",
    "latitude": 42.44267700009971,
    "longitude": -82.96573000001177,
    "address": "Hayes St & E State Fair St"
  },
  {
    "index": 35,
    "waltz": 12,
    "movement": "B",
    "latitude": 42.41711999951693,
    "longitude": -83.02667800005048,
    "address": "Eldon & Doyle"
  },
  {
    "index": 36,
    "waltz": 12,
    "movement": "C",
    "latitude": 42.40310100042002,
    "longitude": -82.96011199989404,
    "address": "Linville & MANISTIQUE"
  },
  {
    "index": 37,
    "waltz": 13,
    "movement": "A",
    "latitude": 42.44006000070473,
    "longitude": -83.083100000006,
    "address": "State Fair & DeQuindre"
  },
  {
    "index": 38,
    "waltz": 13,
    "movement": "B",
    "latitude": 42.41530200004881,
    "longitude": -83.07927899997847,
    "address": "St Auben & Modern St"
  },
  {
    "index": 39,
    "waltz": 13,
    "movement": "C",
    "latitude": 42.43737200033976,
    "longitude": -83.01506600017426,
    "address": "Bliss St & Outer Drive Detroit"
  },
  {
    "index": 40,
    "waltz": 14,
    "movement": "A",
    "latitude": 42.42094900023979,
    "longitude": -83.05492799986715,
    "address": "nancy & healey"
  },
  {
    "index": 41,
    "waltz": 14,
    "movement": "B",
    "latitude": 42.40970400053666,
    "longitude": -83.0998889999185,
    "address": "sears & woodward"
  },
  {
    "index": 42,
    "waltz": 14,
    "movement": "C",
    "latitude": 42.38104900028463,
    "longitude": -82.93412399986933,
    "address": "balfour & St Paul"
  },
  {
    "index": 43,
    "waltz": 15,
    "movement": "A",
    "latitude": 42.37297700173135,
    "longitude": -83.05808599835476,
    "address": "trobly & Russell"
  },
  {
    "index": 44,
    "waltz": 15,
    "movement": "B",
    "latitude": 42.38019499971277,
    "longitude": -83.01567500013722,
    "address": "ferry & Van Dyke"
  },
  {
    "index": 45,
    "waltz": 15,
    "movement": "C",
    "latitude": 42.34659099999806,
    "longitude": -82.95889300000916,
    "address": "Blue Heron Lagoon, Belle Isle, Detroit, M"
  },
  {
    "index": 46,
    "waltz": 16,
    "movement": "A",
    "latitude": 42.34625200024194,
    "longitude": -83.03919400001928,
    "address": "winder & market ST Detroit, MI"
  },
  {
    "index": 47,
    "waltz": 16,
    "movement": "B",
    "latitude": 42.39040000014592,
    "longitude": -83.06192800001301,
    "address": "Holbrook & St Aubin St Detroit MI"
  },
  {
    "index": 49,
    "waltz": 17,
    "movement": "A",
    "latitude": 42.44958199972849,
    "longitude": -82.98567299963199,
    "address": "8 mile Rd & schoenherr"
  },
  {
    "index": 50,
    "waltz": 17,
    "movement": "B",
    "latitude": 42.38531299979817,
    "longitude": -83.11679700003356,
    "address": "Linwood & Monterey"
  },
  {
    "index": 51,
    "waltz": 17,
    "movement": "C",
    "latitude": 42.30715999990805,
    "longitude": -83.10488099992986,
    "address": "orleans & fisher hwy"
  },
  {
    "index": 52,
    "waltz": 18,
    "movement": "A",
    "latitude": 42.4210849996162,
    "longitude": -82.9631910001606,
    "address": "whittier & Kelly"
  },
  {
    "index": 53,
    "waltz": 18,
    "movement": "B",
    "latitude": 42.44517099961777,
    "longitude": -83.06483199984756,
    "address": "Binder & Winchester"
  },
  {
    "index": 54,
    "waltz": 18,
    "movement": "C",
    "latitude": 42.41784699978387,
    "longitude": -82.91959500005777,
    "address": "Linville & Canyon"
  },
  {
    "index": 55,
    "waltz": 19,
    "movement": "A",
    "latitude": 42.34127599969346,
    "longitude": -83.1262329999358,
    "address": "McGraw and Military, Detroit MI"
  },
  {
    "index": 56,
    "waltz": 19,
    "movement": "B",
    "latitude": 42.38099200007549,
    "longitude": -82.98667800015205,
    "address": "East Canfield and Montclair, Detroit MI"
  },
  {
    "index": 57,
    "waltz": 19,
    "movement": "C",
    "latitude": 42.41861799987407,
    "longitude": -83.07258800006339,
    "address": "Joeseph Campau and McNichols, Detroit MI"
  },
  {
    "index": 58,
    "waltz": 20,
    "movement": "A",
    "latitude": 42.33651696121481,
    "longitude": -82.98561937184266,
    "address": "Belle Isle, Conservatory Drive, Detroit, MI"
  },
  {
    "index": 59,
    "waltz": 20,
    "movement": "B",
    "latitude": 42.32745999953098,
    "longitude": -83.07138499988446,
    "address": "vermont & bagley"
  },
  {
    "index": 60,
    "waltz": 20,
    "movement": "C",
    "latitude": 42.44286700014818,
    "longitude": -82.94667400008134,
    "address": "state Fair & Kelly"
  },
  {
    "index": 61,
    "waltz": 21,
    "movement": "A",
    "latitude": 42.42583399976355,
    "longitude": -83.06861200019804,
    "address": "E Nevada and Conant"
  },
  {
    "index": 62,
    "waltz": 21,
    "movement": "B",
    "latitude": 42.35073899983907,
    "longitude": -83.08296500012449,
    "address": "W Warren & rosa Parks Blvd"
  },
  {
    "index": 63,
    "waltz": 21,
    "movement": "C",
    "latitude": 42.41598400029419,
    "longitude": -83.19930999824338,
    "address": "McNichols & Greenfield"
  },
  {
    "index": 64,
    "waltz": 22,
    "movement": "A",
    "latitude": 42.39628400029622,
    "longitude": -83.10203100016876,
    "address": "hamilton & glendale"
  },
  {
    "index": 65,
    "waltz": 22,
    "movement": "B",
    "latitude": 42.39750300058596,
    "longitude": -83.03756599994571,
    "address": "MT.Elliott & Huber"
  },
  {
    "index": 66,
    "waltz": 22,
    "movement": "C",
    "latitude": 42.39698500179107,
    "longitude": -83.18870800158433,
    "address": "HUBELL  &  Eaton DETROIT MI"
  },
  {
    "index": 67,
    "waltz": 23,
    "movement": "A",
    "latitude": 42.36162599972247,
    "longitude": -83.11471300019893,
    "address": "VICKSBERG & HOLMur DETROIT MI"
  },
  {
    "index": 68,
    "waltz": 23,
    "movement": "B",
    "latitude": 42.33869959914298,
    "longitude": -83.14405574461176,
    "address": "florida & Kirkwood Detroit MI"
  },
  {
    "index": 69,
    "waltz": 23,
    "movement": "C",
    "latitude": 42.32923699922333,
    "longitude": -83.19029099762243,
    "address": "ford road & mead ave Detroit MI"
  },
  {
    "index": 70,
    "waltz": 24,
    "movement": "A",
    "latitude": 42.36903199994403,
    "longitude": -83.07690100015705,
    "address": "West Grand & 2nd Ave Detroit MI"
  },
  {
    "index": 71,
    "waltz": 24,
    "movement": "B",
    "latitude": 42.40429339892395,
    "longitude": -83.02412715482878,
    "address": "Van dyke & Lynch"
  },
  {
    "index": 72,
    "waltz": 24,
    "movement": "C",
    "latitude": 42.36193800005716,
    "longitude": -83.06497100022261,
    "address": "John R & Ferry St Detroit Mi"
  },
  {
    "index": 73,
    "waltz": 25,
    "movement": "A",
    "latitude": 42.41734900020686,
    "longitude": -83.1281380002241,
    "address": "McNichols & Linwood Detroit MI"
  },
  {
    "index": 74,
    "waltz": 25,
    "movement": "B",
    "latitude": 42.38217425758403,
    "longitude": -83.2158281921073,
    "address": "Glendale Street & Archdale st"
  },
  {
    "index": 75,
    "waltz": 25,
    "movement": "C",
    "latitude": 42.41197399965843,
    "longitude": -83.0381110000215,
    "address": "Charles & Mt elliot  Detroit MI"
  },
  {
    "index": 76,
    "waltz": 26,
    "movement": "A",
    "latitude": 42.33938269187551,
    "longitude": -83.15226212774512,
    "address": "St. Lawrence & Kirkwood"
  },
  {
    "index": 77,
    "waltz": 26,
    "movement": "B",
    "latitude": 42.3851899997126,
    "longitude": -83.11670999998597,
    "address": "Linwood & Monterey  Detroit MI"
  },
  {
    "index": 78,
    "waltz": 26,
    "movement": "C",
    "latitude": 42.44198277528118,
    "longitude": -83.1487169079399,
    "address": "Norfolk St & Santa Barbara drive"
  },
  {
    "index": 79,
    "waltz": 27,
    "movement": "A",
    "latitude": 42.42326699990885,
    "longitude": -83.03850100001917,
    "address": "Davison & Mt.Elliot"
  },
  {
    "index": 80,
    "waltz": 27,
    "movement": "B",
    "latitude": 42.43984499978433,
    "longitude": -83.09181799984513,
    "address": "Cardoni & State Fair"
  },
  {
    "index": 81,
    "waltz": 27,
    "movement": "C",
    "latitude": 42.42901500039066,
    "longitude": -83.18755999993472,
    "address": "mark Twain & Clarita"
  },
  {
    "index": 82,
    "waltz": 28,
    "movement": "A",
    "latitude": 42.44256499871326,
    "longitude": -83.22124500066663,
    "address": "Hessell & Ashton"
  },
  {
    "index": 83,
    "waltz": 28,
    "movement": "B",
    "latitude": 42.33102700009829,
    "longitude": -83.2324600056449,
    "address": "Ford Rd & Aubern St"
  },
  {
    "index": 84,
    "waltz": 28,
    "movement": "C",
    "latitude": 42.33600100097579,
    "longitude": -83.22540000006823,
    "address": "Paul Drive & Artesian"
  },
  {
    "index": 85,
    "waltz": 29,
    "movement": "A",
    "latitude": 42.33031200058889,
    "longitude": -83.06614699990772,
    "address": "Trumball & Leverette"
  },
  {
    "index": 86,
    "waltz": 29,
    "movement": "B",
    "latitude": 42.35166400024188,
    "longitude": -83.06072199993076,
    "address": "Woodward & Willis"
  },
  {
    "index": 87,
    "waltz": 29,
    "movement": "C",
    "latitude": 42.33103599948328,
    "longitude": -83.03270200006187,
    "address": "atwater & rivard"
  },
  {
    "index": 88,
    "waltz": 30,
    "movement": "A",
    "latitude": 42.43182799687845,
    "longitude": -83.21894800126006,
    "address": "southfield Rd & Cambridge"
  },
  {
    "index": 89,
    "waltz": 30,
    "movement": "B",
    "latitude": 42.28868300001316,
    "longitude": -83.14464499982302,
    "address": "fort st & powell"
  },
  {
    "index": 90,
    "waltz": 30,
    "movement": "C",
    "latitude": 42.44074200041899,
    "longitude": -83.05299299964948,
    "address": "outer dr & Conley"
  },
  {
    "index": 91,
    "waltz": 31,
    "movement": "A",
    "latitude": 42.44352599962425,
    "longitude": -83.14923599997684,
    "address": "norfolk St & santa barbara drive"
  },
  {
    "index": 92,
    "waltz": 31,
    "movement": "B",
    "latitude": 42.35091000060028,
    "longitude": -83.1954999990981,
    "address": "Yinger & Tireman"
  },
  {
    "index": 93,
    "waltz": 31,
    "movement": "C",
    "latitude": 42.37511700017556,
    "longitude": -83.10288599996463,
    "address": "clairmount & 14th St"
  },
  {
    "index": 94,
    "waltz": 32,
    "movement": "A",
    "latitude": 42.34127599969346,
    "longitude": -83.1262329999358,
    "address": "McGraw & Military"
  },
  {
    "index": 95,
    "waltz": 32,
    "movement": "B",
    "latitude": 42.44768199992901,
    "longitude": -83.04407599992142,
    "address": "8 mile & Mound"
  },
  {
    "index": 96,
    "waltz": 32,
    "movement": "C",
    "latitude": 42.37938099968073,
    "longitude": -83.11622300008086,
    "address": "collingwood & Lawton"
  },
  {
    "index": 97,
    "waltz": 33,
    "movement": "A",
    "latitude": 42.36143100024103,
    "longitude": -83.04543300004686,
    "address": "DeQuindre & E. Forest"
  },
  {
    "index": 98,
    "waltz": 33,
    "movement": "B",
    "latitude": 42.33321899975826,
    "longitude": -83.14639899998575,
    "address": "Lonyo & McGraw"
  },
  {
    "index": 99,
    "waltz": 33,
    "movement": "C",
    "latitude": 42.37415200025217,
    "longitude": -83.1203370001711,
    "address": "Rochester & Dexter"
  },
  {
    "index": 100,
    "waltz": 34,
    "movement": "A",
    "latitude": 42.43374799949756,
    "longitude": -83.02448800019964,
    "address": "7 mile & van dyke"
  },
  {
    "index": 101,
    "waltz": 34,
    "movement": "B",
    "latitude": 42.36360399936944,
    "longitude": -83.03938399989472,
    "address": "E. Forest Ave & Chene St"
  },
  {
    "index": 102,
    "waltz": 34,
    "movement": "C",
    "latitude": 42.38361900012613,
    "longitude": -83.15996599992485,
    "address": "Washburn & W Buena Vista"
  },
  {
    "index": 103,
    "waltz": 35,
    "movement": "A",
    "latitude": 42.3948270002257,
    "longitude": -83.1787889998597,
    "address": "Lyndon & Schaeffer"
  },
  {
    "index": 104,
    "waltz": 35,
    "movement": "B",
    "latitude": 42.41516700023593,
    "longitude": -83.05681799970226,
    "address": "shields & Luce"
  },
  {
    "index": 105,
    "waltz": 35,
    "movement": "C",
    "latitude": 42.40309700047916,
    "longitude": -83.10937100016581,
    "address": "kendell & Lincoln"
  },
  {
    "index": 106,
    "waltz": 36,
    "movement": "A",
    "latitude": 42.43198199956611,
    "longitude": -83.12590400012859,
    "address": "7 mile & ponchartrain blvd"
  },
  {
    "index": 107,
    "waltz": 36,
    "movement": "B",
    "latitude": 42.34104599976487,
    "longitude": -83.0140210000594,
    "address": "woodbridge St & Adair St"
  },
  {
    "index": 108,
    "waltz": 36,
    "movement": "C",
    "latitude": 42.43881909037404,
    "longitude": -83.11982154167518,
    "address": "Evergreen Cemetery"
  },
  {
    "index": 109,
    "waltz": 37,
    "movement": "A",
    "latitude": 42.43608900000307,
    "longitude": -83.04351999984296,
    "address": "Mound & emory"
  },
  {
    "index": 110,
    "waltz": 37,
    "movement": "B",
    "latitude": 42.37415200025217,
    "longitude": -83.1203370001711,
    "address": "rochester & dexter"
  },
  {
    "index": 111,
    "waltz": 37,
    "movement": "C",
    "latitude": 42.43399499973555,
    "longitude": -83.20001100008311,
    "address": "greenfield & Vasser"
  },
  {
    "index": 112,
    "waltz": 38,
    "movement": "A",
    "latitude": 42.37689444591156,
    "longitude": -83.21634695814919,
    "address": "archdale & Capitol"
  },
  {
    "index": 113,
    "waltz": 38,
    "movement": "B",
    "latitude": 42.35642199953367,
    "longitude": -83.06422800006143,
    "address": "warren & Woodward"
  },
  {
    "index": 114,
    "waltz": 38,
    "movement": "C",
    "latitude": 42.35897399974154,
    "longitude": -83.0302099997832,
    "address": "St Joseph & McDougal"
  },
  {
    "index": 115,
    "waltz": 39,
    "movement": "A",
    "latitude": 42.3897290001886,
    "longitude": -83.08261799995869,
    "address": "John R St & Belmont detroit MI"
  },
  {
    "index": 116,
    "waltz": 39,
    "movement": "B",
    "latitude": 42.3728745419579,
    "longitude": -83.12005356812321,
    "address": "chicago & dexter detroit MI"
  },
  {
    "index": 117,
    "waltz": 39,
    "movement": "C",
    "latitude": 42.44607999992481,
    "longitude": -83.14212000022992,
    "address": "8 mile & livernois"
  },
  {
    "index": 118,
    "waltz": 40,
    "movement": "A",
    "latitude": 42.42094900023979,
    "longitude": -83.05492799986715,
    "address": "Nancy & Healy"
  },
  {
    "index": 119,
    "waltz": 40,
    "movement": "B",
    "latitude": 42.37674100007403,
    "longitude": -83.01063500017707,
    "address": "E Warren & Maxwell"
  },
  {
    "index": 120,
    "waltz": 40,
    "movement": "C",
    "latitude": 42.40551500005524,
    "longitude": -83.04728100035332,
    "address": "Buffalo & Prescott"
  },
  {
    "index": 121,
    "waltz": 41,
    "movement": "A",
    "latitude": 42.40224099954452,
    "longitude": -83.16940400005706,
    "address": "fenkell & meyers"
  },
  {
    "index": 122,
    "waltz": 41,
    "movement": "B",
    "latitude": 42.37900899984702,
    "longitude": -83.02564699932897,
    "address": "E Grand Blvd & Canton PL"
  },
  {
    "index": 123,
    "waltz": 41,
    "movement": "C",
    "latitude": 42.39034699968187,
    "longitude": -83.13959000017277,
    "address": "Oakman & Livernois"
  },
  {
    "index": 124,
    "waltz": 42,
    "movement": "A",
    "latitude": 42.32499300037392,
    "longitude": -83.16624199997311,
    "address": "miller rd & Michigan"
  },
  {
    "index": 125,
    "waltz": 42,
    "movement": "B",
    "latitude": 42.36294699911957,
    "longitude": -83.04748799996298,
    "address": "dequindre & E Warren"
  },
  {
    "index": 126,
    "waltz": 42,
    "movement": "C",
    "latitude": 42.43851600017746,
    "longitude": -83.1123269999117,
    "address": "bauman & adeline"
  },
  {
    "index": 127,
    "waltz": 43,
    "movement": "A",
    "latitude": 42.38851400001469,
    "longitude": -83.1580500000256,
    "address": "schoolcraft & Kentucky"
  },
  {
    "index": 128,
    "waltz": 43,
    "movement": "B",
    "latitude": 42.42101800018857,
    "longitude": -83.05175800005826,
    "address": "nancy & conley"
  },
  {
    "index": 129,
    "waltz": 43,
    "movement": "C",
    "latitude": 42.33014300004895,
    "longitude": -83.05653099984886,
    "address": "abbott & 3rd Street"
  },
  {
    "index": 130,
    "waltz": 44,
    "movement": "A",
    "latitude": 42.42739499996988,
    "longitude": -82.9969850000752,
    "address": "hamburg & greiner"
  },
  {
    "index": 131,
    "waltz": 44,
    "movement": "B",
    "latitude": 42.37282399975736,
    "longitude": -83.05806499999467,
    "address": "Trombly & Russell"
  },
  {
    "index": 132,
    "waltz": 44,
    "movement": "C",
    "latitude": 42.37680299961395,
    "longitude": -82.99880400007848,
    "address": "canfield & Belvedere"
  },
  {
    "index": 133,
    "waltz": 45,
    "movement": "A",
    "latitude": 42.33137100056508,
    "longitude": -83.07642699978604,
    "address": "14th Street & Michigan"
  },
  {
    "index": 134,
    "waltz": 45,
    "movement": "B",
    "latitude": 42.39502600019242,
    "longitude": -83.16904699995031,
    "address": "meyers & Lyndon"
  },
  {
    "index": 135,
    "waltz": 45,
    "movement": "C",
    "latitude": 42.37900899929972,
    "longitude": -83.02564699989648,
    "address": "E Grand Blvd & Canton Pl"
  },
  {
    "index": 136,
    "waltz": 46,
    "movement": "A",
    "latitude": 42.33137100056508,
    "longitude": -83.07642699978604,
    "address": "14th Street & Michigan Detroit, MI"
  },
  {
    "index": 137,
    "waltz": 46,
    "movement": "B",
    "latitude": 42.42980899978779,
    "longitude": -83.14249400026158,
    "address": "Clarita & Stoepple"
  },
  {
    "index": 138,
    "waltz": 46,
    "movement": "C",
    "latitude": 42.42888599981462,
    "longitude": -83.11279099995993,
    "address": "woodward & golden gate"
  },
  {
    "index": 139,
    "waltz": 47,
    "movement": "A",
    "latitude": 42.33454800024089,
    "longitude": -82.99905500018642,
    "address": "Fountain Way, Belle Isle,"
  },
  {
    "index": 140,
    "waltz": 47,
    "movement": "B",
    "latitude": 42.43731499967507,
    "longitude": -83.09712000005192,
    "address": "Yacama Road & Lance"
  },
  {
    "index": 141,
    "waltz": 47,
    "movement": "C",
    "latitude": 42.44632999996846,
    "longitude": -83.13043800000176,
    "address": "8 mile & Durham"
  },
  {
    "index": 142,
    "waltz": 48,
    "movement": "A",
    "latitude": 42.39502600019242,
    "longitude": -83.16904699995031,
    "address": "meyers & Lyndon"
  },
  {
    "index": 143,
    "waltz": 48,
    "movement": "B",
    "latitude": 42.32679199977638,
    "longitude": -83.07759100024275,
    "address": "Newmark & 16th Street"
  },
  {
    "index": 144,
    "waltz": 48,
    "movement": "C",
    "latitude": 42.37528499980619,
    "longitude": -83.05578599998296,
    "address": "orleans & Milwaukee"
  },
  {
    "index": 145,
    "waltz": 49,
    "movement": "A",
    "latitude": 42.37143599997896,
    "longitude": -83.01791300002417,
    "address": "E Grand & Forest  street"
  },
  {
    "index": 146,
    "waltz": 49,
    "movement": "B",
    "latitude": 42.32434899942687,
    "longitude": -83.08547800007419,
    "address": "23rd Street & W Vernor"
  },
  {
    "index": 147,
    "waltz": 49,
    "movement": "C",
    "latitude": 42.36642999932583,
    "longitude": -83.03872900018635,
    "address": "E Warren & Grandy"
  }
]