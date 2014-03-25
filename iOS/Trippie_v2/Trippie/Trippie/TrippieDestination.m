//
//  TrippieDestination.m
//  Trippie
//
//  Created by Jordan Wood on 2014-03-13.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TrippieDestination.h"

@implementation TrippieDestination

@synthesize _id;
@synthesize name;
@synthesize outgoingTransportationID;

- (id) initWithData:(NSDictionary *) destDictionary;
{
    if ((self = [super init])) {
        self._id = [destDictionary objectForKey:@"_id"];
        self.name = [destDictionary objectForKey:@"name"];
        self.outgoingTransportationID = [destDictionary objectForKey:@"outgoingTransportationID"];
    }
    
    return self;
}

@end
