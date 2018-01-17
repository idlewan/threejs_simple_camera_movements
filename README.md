## Compiling
You need to have a recent version of make installed on your system.
The following command should download all the tools and dependencies necessary
(three.js, rollup, stylus, pug and a few rollup addons).
You can also use `npm install` if preffered.
```
    yarn install
```
You can now compile the project. It should create a `_build` directory containing
all necessary files for the project (apart from the background objects).
Gzipping the files has not been included in the build script.
```
    make
```

## TODO / possible ameliorations
- The camera position for each waypoint has been put above the cube instead of
inside it. It should prevent the camera from entering/exiting the cube surfaces,
making it feel better.
- Instead of straight paths from one to the other lookAt positions, there could
be a curve that the lookAt would follow. It would prevent the camera looking
down when changing targets quickly.
- The UI should disable the possibility to click on the target where the camera
already is. It could also be displayed like a dialog window from an old
point-and-click game (this dialog window would hide during camera transitions):
```
    You are at position A.
        -> Get to B
        -> Get to C
```
