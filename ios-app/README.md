# ios-dkk8es


Name: Darwin Khay

Computing ID: dkk8es

## Some notes about running the app
The pre-populated data really only shows on the preview of the ContentView, but I still did manually pre-populate some items when running the simulator; however, these items do not have a completion date that differs from each other, only the pre-populated items on the preview of ContentView have differing completion dates.

Other than that, the app works fine either in preview or simulator.


## Special Features

There is the ability to swipe to delete an item on the bucket list. There is also the ability to swipe to “favorite” any uncompleted bucket list items. These items will be highlighted blue and be brought to the top of the bucket list and will be sorted by due date among the other items that are also favorited. Completed bucket list items cannot be favorited since they’re already completed.

## Lessons Learned

I used SwiftUI to build my app as opposed to Storyboard for iOS/Swift. It definitely felt a lot better and more intuitive and actually closely related to when I built my first app in React Native. However, there were some annoying obstacles that I had to overcome. For instance, accessing the source of data was difficult since I wasn’t sure how data was being saved exactly. I was confused about whether or not the managedObjectContext variable was able to be accessed from different screens/views, and it turned out that it can be, and this was how I accessed the data to update or delete items. Sending information from one screen to another felt similar to how one would do in React Native. React Native can use JSON, but SwiftUI does not. However, the way that the information is passed between screens is still similar since it looks like it’s in JSON format (i.e. you provide a name/parameter for the variable and then the value itself) using a NavigationLink provided with the screen/view to go to along with its parameter values. The way to sort collections was also a little confusing, at least in terms of the collections used in this app. The collections used in this app were FetchedResults<>, and the way these were sorted was by providing an annotation before the declaration of the FetchedResults<> variable that holds the collection. The annotation has a sortDescriptors that defines how the collection would be sorted (i.e. based on what attribute of the item in the data source). Overall, I’d say SwiftUI was confusing to use at first, but became more intuitive and easy to use, except that the app breaks easily over small things, especially with the use of optionals.
