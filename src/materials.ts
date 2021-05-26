interface IMaterials {
  metalFrames: {
    Steel?: any;
    Aluminium?: any;
  };
  plasterBoards: {
    Standard?: any;
    Insulated?: any;
  };
  fixings: {
    waferHeadScrews?: any;
    nailablePlugs?: any;
    highThreadScrews?: any;
    selfTapingSrews?: any;
  };
}

const materials: IMaterials = {
  metalFrames: {
    Steel: {
      uTracks: {
        proTrackSteel120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004564.jpg?size=xl',
        },
        proTrackSteel125x3_6: {
          length: 10.4,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004564.jpg?size=xl',
        },
      },
      cStoods: {
        proStudSteel120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004274.jpg?size=xl',
        },
        proStudSteel96x3_6: {
          length: 8,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004274.jpg?size=xl',
        },
      },
    },
    Aluminium: {
      uTracks: {
        proTrackAluminium120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004564.jpg?size=xl',
        },
        proTrackAluminium125x3_6: {
          length: 10.4,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004564.jpg?size=xl',
        },
      },
      cStoods: {
        proStudAluminium120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004274.jpg?size=xl',
        },
        proStudAluminium96x3_6: {
          length: 8,
          width: 3.6,
          quantity: 0,
          image: 'https://mobileimages.lowes.com/product/converted/751361/751361004274.jpg?size=xl',
        },
      },
    },
  },
  plasterBoards: {
    Standard: {
      Standard4x8: {
        width: 4,
        height: 8,
        thickness: 0.5,
        quantity: 0,
        image: 'https://mobileimages.lowes.com/product/converted/800805/800805145506.jpg?size=xl',
      },
      Standard4_5x8: {
        width: 4.5,
        height: 8,
        thickness: 0.5,
        quantity: 0,
        image: 'https://mobileimages.lowes.com/product/converted/800805/800805145506.jpg?size=xl',
      },
      Standard4x10: {
        width: 4,
        height: 10,
        thickness: 0.5,
        quantity: 0,
        image: 'https://mobileimages.lowes.com/product/converted/800805/800805145506.jpg?size=xl',
      },
      Standard4_5x10: {
        width: 4.5,
        height: 10,
        thickness: 0.5,
        quantity: 0,
        image: 'https://mobileimages.lowes.com/product/converted/800805/800805145506.jpg?size=xl',
      },
    },
    Insulated: {
      Insulated4x8: {
        width: 4,
        height: 8,
        thickness: 0.5,
        quantity: 0,
        image: 'https://images.lowes.com/product/converted/811900/811900021930.jpg',
      },
      Insulated4_5x8: {
        width: 4.5,
        height: 8,
        thickness: 0.5,
        quantity: 0,
        image: 'https://images.lowes.com/product/converted/811900/811900021930.jpg',
      },
      Insulated4x10: {
        width: 4,
        height: 10,
        thickness: 0.5,
        quantity: 0,
        image: 'https://images.lowes.com/product/converted/811900/811900021930.jpg',
      },
      Insulated4_5x10: {
        width: 4.5,
        height: 10,
        thickness: 0.5,
        quantity: 0,
        image: 'https://images.lowes.com/product/converted/811900/811900021930.jpg',
      },
    },
  },
  fixings: {
    waferHeadScrews: {
      quantity: 0,
      image: 'https://www.essve.com/globalassets/import-resources/1052905.png?width=300&height=300&quality=80',
    },
    nailablePlugs: {
      quantity: 0,
      image:
        'data:image/jpeg;base64,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',
    },
    highThreadScrews: {
      quantity: 0,
      image:
        'https://cdn.siniat.co.uk/-/assets/60379b8846d94889bf81a4f100bbdbc9/GTEC%20Drywall%20High%20Thread%20Screw.ashx?la=en&rev=d089e2b6b6154d3481c2cac5296ed6af&hash=1CC3765CF513A135BEC88B25668321895BC40EAE',
    },
    selfTapingSrews: {
      quantity: 0,
      image: 'https://images-na.ssl-images-amazon.com/images/I/81q9R1uFcoL._AC_SL1500_.jpg',
    },
  },
};

export default materials;
