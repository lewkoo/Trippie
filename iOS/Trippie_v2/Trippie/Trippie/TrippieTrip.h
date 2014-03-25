//
//  TrippieTrip.h
//  Trippie
//
//  Created by Jordan Wood on 2014-03-13.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TrippieTrip : NSObject

@property (nonatomic, strong) NSString *_id;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSArray *destinationList;
@property (nonatomic, strong) NSDate *tripStartDate;
@property (nonatomic, strong) NSDate *tripEndDate;

- (id) initWithData:(NSDictionary *) object;

@end
