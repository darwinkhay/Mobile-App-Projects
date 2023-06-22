//
//  Persistence.swift
//  Bucket List dkk8es
//
//  Created by Darwin Khay on 11/1/22.
//
/**
 https://developer.apple.com/documentation/foundation/datecomponents (date components)
 */
import CoreData

struct PersistenceController {
    static let shared = PersistenceController()

    static var preview: PersistenceController = {
        let result = PersistenceController(inMemory: true)
        let viewContext = result.container.viewContext

        let newItem = Item(context: viewContext)
        newItem.name = "Travel around the world"
        newItem.desc = "Travel to all countries"
        newItem.date = DateComponents(calendar: .current, year: 2022, month: 11, day: 27).date
        newItem.completionDate = DateComponents(calendar: .current, year: 2022, month: 12, day: 24).date
        newItem.completed = true
        newItem.favorited = false

        let newItem2 = Item(context: viewContext)
        newItem2.name = "Be happy"
        newItem2.desc = "Don't be happy"
        newItem2.date = DateComponents(calendar: .current, year: 2023, month: 10, day: 24).date
        newItem2.completionDate = DateComponents(calendar: .current,year: 2024, month: 12, day: 21).date
        newItem2.completed = true
        newItem2.favorited = false

        let newItem3 = Item(context: viewContext)
        newItem3.name = "Be friends forever with ___"
        newItem3.desc = "You will be friends forever, it's ok"
        newItem3.date = DateComponents(calendar: .current, year: 2022, month: 7, day: 6).date
//        newItem3.completionDate = DateComponents(calendar: .current,year: 2023, month: 8, day: 23).date
        newItem3.completed = false
        newItem3.favorited = false
        
        do {
            try viewContext.save()
        } catch {
            // Replace this implementation with code to handle the error appropriately.
            // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
        return result
    }()

    let container: NSPersistentContainer

    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "Bucket_List_dkk8es")
        if inMemory {
            container.persistentStoreDescriptions.first!.url = URL(fileURLWithPath: "/dev/null")
        }
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.

                /*
                 Typical reasons for an error here include:
                 * The parent directory does not exist, cannot be created, or disallows writing.
                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                 * The device is out of space.
                 * The store could not be migrated to the current model version.
                 Check the error message to determine what the actual problem was.
                 */
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        container.viewContext.automaticallyMergesChangesFromParent = true
    }
}
