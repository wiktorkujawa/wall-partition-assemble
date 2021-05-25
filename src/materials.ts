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
    waferHeadScrews: number,
    nailablePlugs: number,
    highThreadScrews: number,
    selfTapingSrews: number
  }
}

const materials: IMaterials = {
  metalFrames: {
    Steel: {
      uTracks: {
        proTrackSteel120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
        },
        proTrackSteel125x3_6: {
          length: 10.4,
          width: 3.6,
          quantity: 0,
        },
      },
      cStoods: {
        proStudSteel120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
        },
        proStudSteel96x3_6: {
          length: 8,
          width: 3.6,
          quantity: 0,
        },
      }
    },
    Aluminium: {
      uTracks: {
        proTrackAluminium120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
        },
        proTrackAluminium125x3_6: {
          length: 10.4,
          width: 3.6,
          quantity: 0,
        },
      },
      cStoods: {
        proStudAluminium120x3_6: {
          length: 10,
          width: 3.6,
          quantity: 0,
        },
        proStudAluminium96x3_6: {
          length: 8,
          width: 3.6,
          quantity: 0,
        },
      }
    },
  },
  plasterBoards: {
    Standard: {
      Standard4x8: {
        width: 4,
        height: 8,
        thickness: 0.5,
        quantity: 0,
      },
      Standard4_5x8: {
        width: 4.5,
        height: 8,
        thickness: 0.5,
        quantity: 0,
      },
      Standard4x10: {
        width: 4,
        height: 10,
        thickness: 0.5,
        quantity: 0,
      },
      Standard4_5x10: {
        width: 4.5,
        height: 10,
        thickness: 0.5,
        quantity: 0,
      },
    },
    Insulated: {
      Insulated4x8: {
        width: 4,
        height: 8,
        thickness: 0.5,
        quantity: 0,
      },
      Insulated4_5x8: {
        width: 4.5,
        height: 8,
        thickness: 0.5,
        quantity: 0,
      },
      Insulated4x10: {
        width: 4,
        height: 10,
        thickness: 0.5,
        quantity: 0,
      },
      Insulated4_5x10: {
        width: 4.5,
        height: 10,
        thickness: 0.5,
        quantity: 0,
      },
    },
  },
  fixings: {
    waferHeadScrews: 0,
    nailablePlugs: 0,
    highThreadScrews: 0,
    selfTapingSrews: 0,
  },
};

export default materials;
