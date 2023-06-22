# reactnative-dkk8es
reactnative-dkk8es created by GitHub Classroom

Name: Darwin Khay

Computing ID: dkk8es

# To run
Probably need to do this first to run the app after cloning my repo:
```bash
npm install
```

Then you can get the qr code to run on expo:
```bash
npm start
```


*** For the first time you run the app, it might keep refreshing without you doing anything, so run ```npm start``` again and scan the second QR code to relaunch the app again ***

# Special Features
One special feature my app has is the ability to delete any of the bucket list items on the home screen. Each item can be swiped left to display a red button that says "delete" and can be pressed to remove the item from the list. 


# Lessons Learned

One thing I learned from building this React Native App is that it's pretty efficient to make an app using this platform. Everything seems to be structured in a way that makes sense to me. Having a screens folder, a components folder and styles folder makes it easy to know where everything is and belongs. In addition, the mechanic of switching between screens as well as sending information between screens is very intuitive and is essentially repeated since it just requires the use of one function: navigation.navigate(). The information being passed around is always in JSON format which makes it easy to standardize how information should look and be passed. React itself is also intuitive because it looks a lot like HTML format with the "tags". However, there were some obstacles in making this app. When looking for libraries to import in order to have certain features, more often than not I'd come across errors because of the library not being compatible with both iOS and Android or they are just straight up deprecated and not supported anymore. This made it a little harder to develop the app because finding such libraries that actually do work and are compatible is what made up most of the time to develop the app. Using Expo helps a lot as it saves time to play with the app; it's much quicker to just pull up the app on your own phone instead of having to rely on an emulator that takes longer to load. Overall, I'd say React Native is the best platform I've used to develop an app simply because it's so simple to use; even with the minor setbacks, the convenience outweights it all.

