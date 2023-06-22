//
//  EditItemView.swift
//  Bucket List dkk8es
//
//  Created by Darwin Khay on 11/3/22.
//
/**
 https://blckbirds.com/post/core-data-and-swiftui/ (updating core data)
 https://designcode.io/swiftui-handbook-formatted-date (date formatting)
 */

import Foundation
import SwiftUI
struct EditItemView: View{
   
    @Environment(\.presentationMode) var presentation
    @Environment(\.managedObjectContext) private var viewContext
    
    @State var name: String = "";
    @State var desc: String = "";
    @State var date: Date = Date();
    @State var completionDate: Date = Date();
    @State var completed: Bool = false;
    @State var favorited: Bool = false;
    @State var itemToEdit: Item;
    var body: some View{
        NavigationView{
            Form{
                Section(header: Text("Name")){
                    TextField(name, text: $name);
                }
                Section(header: Text("Description")){
                    TextField(desc, text: $desc);
                    
                }
                Section(header: Text("Pick a due date")){
                    DatePicker("Due Date", selection: $date, displayedComponents: [.date]).datePickerStyle(.graphical)
                }
               
                
//                Toggle(isOn: $completed){
//                    if completed{
//                        Text("Completed")
//                        
//                    } else{
//                        Text("Incomplete")
//                    }
//                }
                

//                Button("SUBMIT", action: {
//                    
//                    //presentation.wrappedValue.dismiss()
//                    goBackAndUpdateData()
//                    //print($name, $desc, $date)
//                    
//                }).buttonStyle(GrowingButton())
                
            }
            
        }.navigationBarTitle("Edit item")
            .toolbar {
                
                ToolbarItem {
                   
                    Button("Save", action: {
                        goBackAndUpdateData()
                    })
                     
                    
                    
                }
            }
        if completed{
            let formattedCompletionDate = completionDate.formatted(.dateTime.day().month().year())
            Text("COMPLETED on \(formattedCompletionDate)").foregroundColor(.red)
        }
    }
    
    private func goBackAndUpdateData(){

        viewContext.performAndWait {
            itemToEdit.name = name
            itemToEdit.desc = desc
            itemToEdit.date = date
            itemToEdit.completed = completed
            itemToEdit.completionDate = completionDate
            itemToEdit.favorited = favorited
        }
        
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
