//
//  TrippieTrip.h
//  Trippie
//
//  Created by Jordan Wood on 2014-03-13.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TrippieTrip : NSObject

@property NSString *_id;
@property NSString *name;
@property NSMutableArray *destinationList;
@property NSDate *tripStartDate;
@property NSDate *tripEndDate;

@end
