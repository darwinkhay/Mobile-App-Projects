//
//  ContentView.swift
//  Bucket List dkk8es
//
//  Created by Darwin Khay on 11/1/22.
//

/**
 https://www.hackingwithswift.com/forums/swiftui/navigationlink-view-in-toolbar-unwanted-nested-child-views-on-model-change/9844 (making button in toolbar go to a different screen)
 https://betterprogramming.pub/build-a-to-do-app-in-swiftui-using-the-new-ios-15-features-afe5650a24a9 (VStack and HStack formatting)
 
 https://stackoverflow.com/questions/57896764/pass-information-to-another-view-with-navigationlink (passing data to another view using navigation link)
 https://blckbirds.com/post/core-data-and-swiftui/ (updating core data)
 https://peterfriese.dev/posts/swiftui-listview-part4/ (swipe actions)
 
 https://sarunw.com/posts/swiftui-list-row-background-color/ (row colors)
 */

import SwiftUI
import CoreData

struct ContentView: View {
    @Environment(\.managedObjectContext) private var viewContext

    @FetchRequest(
        sortDescriptors: [NSSortDescriptor(keyPath: \Item.date, ascending: true)],
        animation: .default)
    
    
    private var items: FetchedResults<Item>
    

   
    @FetchRequest(
        sortDescriptors: [NSSortDescriptor(keyPath: \Item.completionDate, ascending: true)],
        animation: .default)
    private var onlyCompleted: FetchedResults<Item>;
  
    @FetchRequest(
        sortDescriptors: [NSSortDescriptor(keyPath: \Item.date, ascending: true)],
        animation: .default)
    private var favoritedItems: FetchedResults<Item>;
    
    var body: some View {
        NavigationView {
            List {
                ForEach(favoritedItems) { item in
                    
                    if(item.favorited == true && item.completed == false){
                        NavigationLink {
                            EditItemView(name: item.name ?? "", desc: item.desc ?? "", date: item.date ?? Date(), completionDate: item.completionDate ?? Date(), completed: item.completed,favorited: item.favorited, itemToEdit: item);
                            
                        } label: {
                            VStack(alignment: .leading){
                                HStack{
                                    Text("⭐️\(item.name!)").fontWeight(.bold)
                                        .font(.system(size: 20));
                                }.padding(.bottom , 5)
                                
                                HStack{
                                    Text(item.desc!);
                                }.padding(.bottom, 5)
                                
                                HStack{
                                    
                                    Text("Due Date: \(item.date!, style: .date)");
                                    
                                    
                                }
                            }.swipeActions(allowsFullSwipe: false){
                                Button{
                                    viewContext.delete(item)
                                }label:{
                                    Label("", systemImage: "trash");
                                }.tint(.red);
                                Button{
                                    item.completed = true
                                    item.completionDate = Date()
                                    try? viewContext.save()
                                    
                                }label:{
                                    Label("", systemImage: "checkmark.circle")
                                }.tint(.orange);
                                Button{
                                    item.favorited = false
                                    try? viewContext.save()
                                    
                                }label:{
                                    Label("", systemImage: "star.slash")
                                }.tint(.blue);
                                
                            }
                        }
                    }
                }.listRowBackground(Color.cyan)
                
                    ForEach(items) { item in
                     
                        if(item.completed == false && item.favorited == false){
                            
                            NavigationLink {
                                EditItemView(name: item.name ?? "", desc: item.desc ?? "", date: item.date ?? Date(), completionDate: item.completionDate ?? Date(), completed: item.completed,favorited: item.favorited, itemToEdit: item);
                                
                            }label: {
                                VStack(alignment: .leading){
                                    HStack{
                                        Text(item.name!).fontWeight(.bold)
                                            .font(.system(size: 20));
                                    }.padding(.bottom , 5)
                                    
                                    HStack{
                                        Text(item.desc!);
                                    }.padding(.bottom, 5)
                                    
                                    HStack{
                                        
                                        Text("Due Date: \(item.date!, style: .date)");
                                        
                                    }
                                    
                                    
                                }.swipeActions(allowsFullSwipe: false){
                                    Button{
                                        viewContext.delete(item)
                                    }label:{
                                    Label("", systemImage: "trash");
                                    }.tint(.red);
                                    Button{
                        
                                            item.completed = true
                                        item.completionDate = Date()
                                        try? viewContext.save()
                                        
                                            

                                    }label:{
                                        Label("", systemImage: "checkmark.circle")
                                    }.tint(.orange);
                                    
                                    Button{
                                        item.favorited = true
                                        try? viewContext.save()
                                    }label:{
                                    Label("", systemImage: "star");
                                    }.tint(.blue);
                                    
                                }
                            }
                        }
                        
                    }
                    
                    
                    
                ForEach(onlyCompleted) { item in
                    
                    if(item.completed == true){
                        NavigationLink {
                            EditItemView(name: item.name ?? "", desc: item.desc ?? "", date: item.date ?? Date(), completionDate: item.completionDate ?? Date(), completed: item.completed,favorited: item.favorited, itemToEdit: item);
                            
                        } label: {
                            VStack(alignment: .leading){
                                HStack{
                                    Text("✅\(item.name!)").fontWeight(.bold)
                                        .font(.system(size: 20));
                                }.padding(.bottom , 5)
                                
                                HStack{
                                    Text(item.desc!);
                                }.padding(.bottom, 5)
                                
                                HStack{
                                    
                                    Text("Completion Date: \(item.completionDate!, style: .date)");
                                    
                                    
                                }
                            }.swipeActions(allowsFullSwipe: false){
                                Button{
                                    viewContext.delete(item)
                                }label:{
                                    Label("", systemImage: "trash");
                                }.tint(.red);
                                Button{
                                    item.completed = false
                                    try? viewContext.save()
                                    
                                }label:{
                                    Label("", systemImage: "xmark.circle")
                                }.tint(.orange);
                                
                            }
                        }
                    }
                }
                
               
                 
                
           
            }.navigationTitle("My UVA Bucket List")
            .toolbar {
                
                ToolbarItem {
                   NavigationLink(
                    destination: AddItemView(),
                    label:{
                        Label("Add Item", systemImage: "plus")
                    })
                       
                     
                    
                    
                }
            }
            
        }
    }

//    private func addItem() {
//        
//        withAnimation {
//            let newItem = Item(context: viewContext)
//            newItem.timestamp = Date();
//            newItem.name = "bruh";
//
//            do {
//                try viewContext.save()
//            } catch {
//                // Replace this implementation with code to handle the error appropriately.
//                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
//                let nsError = error as NSError
//                fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
//            }
//        }
//
//    }

    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            offsets.map { items[$0] }.forEach(viewContext.delete)

            do {
                try viewContext.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nsError = error as NSError
                fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
            }
        }
    }
    private func markAsComplete(item: Item){

        viewContext.performAndWait {
            item.completed = true
        }
        
        do {
            try viewContext.save()
        } catch {
            // Replace this implementation with code to handle the error appropriately.
            // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
    }
   
}

//private let itemFormatter: DateFormatter = {
//    let formatter = DateFormatter()
//    formatter.dateStyle = .short
//
//    return formatter
//}()




struct ContentView_Previews: PreviewProvider {

    static var previews: some View {
      
        ContentView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
    }
}
