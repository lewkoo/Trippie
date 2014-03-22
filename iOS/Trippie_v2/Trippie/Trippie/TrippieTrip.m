//
//  TrippieTrip.m
//  Trippie
//
//  Created by Jordan Wood on 2014-03-13.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TrippieTrip.h"

@implementation TrippieTrip

@synthesize _id;
@synthesize name;
@synthesize destinationList;
@synthesize tripStartDate;
@synthesize tripEndDate;

- (id) initWithData:(NSDictionary *) tripDictionary;
{
    if ((self = [super init])) {
        self._id = [tripDictionary objectForKey:@"_id"];
        self.name = [tripDictionary objectForKey:@"name"];
        self.destinationList = [tripDictionary objectForKey:@"destinationList"];
        
        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
        self.tripStartDate = [dateFormatter dateFromString:[tripDictionary objectForKey:@"tripStartDate"]];
        self.tripEndDate = [dateFormatter dateFromString:[tripDictionary objectForKey:@"tripEndDate"]];
    }
    
    return self;
}

@end
