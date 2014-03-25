//
//  TrippieDestination.h
//  Trippie
//
//  Created by Jordan Wood on 2014-03-13.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TrippieDestination : NSObject

@property NSString *_id;
@property NSString *name;
@property NSString *outgoingTransportationID;
@property NSMutableArray *eventIDs;
@property NSMutableArray *lodgingIDs;
@property NSMutableArray *noteIDs;

- (id) initWithData:(NSDictionary *) object;

@end
