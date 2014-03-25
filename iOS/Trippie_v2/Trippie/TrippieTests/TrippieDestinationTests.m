//
//  TrippieDestinationTests.m
//  Trippie
//
//  Created by Joel Wiebe on 2014-03-25.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "TrippieDestination.h"

@interface TrippieDestinationTests : XCTestCase

@end
NSDictionary *tempDictionary;
TrippieDestination *dest;

@implementation TrippieDestinationTests

- (void)setUp
{
    [super setUp];
    // Put setup code here; it will be run once, before the first test case.
    tempDictionary = @{ @"_id" : @"532342454fa647ee6cd8740b", @"name" : @"Monterrey", @"outgoingTransportationID" : @"532894d637f6e82704a2b9ec" };
    dest = [[TrippieDestination alloc] initWithData:tempDictionary];
}

- (void)tearDown
{
    // Put teardown code here; it will be run once, after the last test case.
    [super tearDown];
}

- (void)testDestinationID
{
    XCTAssertEqual(dest._id, @"532342454fa647ee6cd8740b", "Destination IDs should match");
}

- (void)testDestinationName
{
    XCTAssertEqual(dest.name, @"Monterrey", "Destination names should match");
}

- (void)testDestinationOutgoingTransportationID
{
    XCTAssertEqual(dest.outgoingTransportationID, @"532894d637f6e82704a2b9ec", "Outgoing transportation IDs should match");
}

@end
