sudo npm install -g eslint
eslint --init
sudo npm install -g jest
REM babel-jest: transpiles code and tests with
REM Babel before the tests run.  A .babelrc file
REM is required for this to work.
npm install --save-dev babel-jest
REM If you want eslint to be watched
REM but without using webpack to do so...
npm install -g eslint-watch
