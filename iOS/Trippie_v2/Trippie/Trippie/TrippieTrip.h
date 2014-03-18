//
//  TrippieTrip.h
//  Trippie
//
//  Created by David John Horsman on 2014-03-18.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>


@interface TrippieTrip : NSManagedObject

@property (nonatomic, retain) NSString * id;
@property (nonatomic, retain) NSString * name;
@property (nonatomic, retain) id destinationList;
@property (nonatomic, retain) NSDate * tripStartDate;
@property (nonatomic, retain) NSDate * tripEndDate;

@end
