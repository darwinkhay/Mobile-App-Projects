//
//  Bucket_List_dkk8esApp.swift
//  Bucket List dkk8es
//
//  Created by Darwin Khay on 11/1/22.
//

import SwiftUI

@main
struct Bucket_List_dkk8esApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
