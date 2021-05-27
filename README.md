# Wall partition
Library to manage materials order needed to build the partition wall of given length. All the values are meant to respond to linear feet scale.

It have one function(calculateOrder) with one mandatory entry point, which is wall Length, and optional entry points(with default values setted on start):

- Wall height(default: 8)
- plasterBoardType(default: 'Standard'),
- floorMaterial(default: 'Lumber'),
- ceilingMaterial(default: 'Lumber'),
- connectedWallMaterial:(default: 'Lumber'),
- metalFrameMaterial: (default: 'Steel')',

It returns an array, with item lists needed to build the needed wall:

- U-Tracks
- C-Stoods
- Plasterboards
- screws

Each item have name, quantity and image property.
