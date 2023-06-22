//
//  AddItemView.swift
//  Bucket List dkk8es
//
//  Created by Darwin Khay on 11/1/22.
//
/**
 https://www.simpleswiftguide.com/swiftui-form-tutorial-how-to-create-and-use-form-in-swiftui/ (form tutorial)
 https://developer.apple.com/documentation/swiftui/datepicker (datepicker)
 https://www.hackingwithswift.com/quick-start/swiftui/customizing-button-with-buttonstyle (button customization)
 https://stackoverflow.com/questions/56829974/swiftui-how-to-push-to-next-screen-when-tapping-on-button (how to go back)
 
 https://stackoverflow.com/questions/68408668/swiftui-how-to-pass-data-to-previous-screen-on-dismiss (how to send data to previous screen)
 
 https://developer.apple.com/documentation/swiftui/toggle (toggle)
 */

import Foundation
import SwiftUI

struct AddItemView: View{
    @Environment(\.presentationMode) var presentation
    @Environment(\.managedObjectContext) private var viewContext
    @State var name: String = "";
    @State  var desc: String = "";
    @State var date: Date = Date();
    //@State var completed: Bool = false;
    
    var body: some View{
    
        NavigationView{
            Form{
                Section(header: Text("Name")){
                    TextField("Name", text: $name);
                }
                Section(header: Text("Description")){
                    TextField("Description", text: $desc);

                }
                Section(header: Text("Pick a due date")){
                    DatePicker("Due Date", selection: $date, displayedComponents: [.date]).datePickerStyle(.graphical)
                }
              
                
//                    Toggle(isOn: $completed){
//                        if completed{
//                            Text("Completed")
//                        } else{
//                            Text("Incomplete")
//                        }
//                    }O
                
//                NavigationLink(
//                 destination: ContentView(),
//                 label:{
//                     Label("SUBMIT", systemImage: "submit")
//                 })
//                Button("SUBMIT", action: {
//
//                    //presentation.wrappedValue.dismiss()
//                   goBackAndSaveData()
//                    //print($name, $desc, $date)
//
//                }).buttonStyle(GrowingButton())
                
            }
            
        }.navigationBarTitle("Create a new item")
        .toolbar {
            
            ToolbarItem {
               
                Button("Save", action: {
                    goBackAndSaveData()
                })
                 
                
                
            }
        }
            
        
    }
    
    
 
    
    private func goBackAndSaveData(){


        let newItem = Item(context: viewContext)
        newItem.name = name
        newItem.desc = desc
        newItem.date = date
        newItem.completionDate = Date()
        newItem.completed = false
        newItem.favorited = false
        do {
            try viewContext.save()
        } catch {
            // Replace this implementation with code to handle the error appropriately.
            // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
        presentation.wrappedValue.dismiss()
    }
}

struct GrowingButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(.blue)
            .foregroundColor(.white)
            .clipShape(Capsule())
            .scaleEffect(configuration.isPressed ? 1.2 : 1)
            .animation(.easeOut(duration: 0.2), value: configuration.isPressed)
    }
}
