//
//  TrippieTripTests.m
//  Trippie
//
//  Created by Joel Wiebe on 2014-03-25.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "TrippieTrip.h"

@interface TrippieTripTests : XCTestCase

@end
NSDictionary *tempDictionary;
TrippieTrip *trip;

@implementation TrippieTripTests

- (void)setUp
{
    [super setUp];
    // Put setup code here; it will be run once, before the first test case.
    tempDictionary = @{ @"_id" : @"532342454fa647ee6cd8740b", @"name" : @"Mexico", @"tripEndDate" : @"2014-04-11T17:34:40.000Z", @"tripStartDate" : @"2014-03-27T17:49:40.000Z"};
    trip = [[TrippieTrip alloc] initWithData:tempDictionary];
}

- (void)tearDown
{
    // Put teardown code here; it will be run once, after the last test case.
    [super tearDown];
}

- (void)testTripID
{
    XCTAssertEqual(trip._id, @"532342454fa647ee6cd8740b", "Trip IDs should match");
}

- (void)testTripName
{
    XCTAssertEqual(trip.name, @"Mexico", "Trip names should match");
}

- (void)testTripEndDate
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
    XCTAssertTrue([[dateFormatter stringFromDate: trip.tripEndDate] isEqualToString:@"2014-04-11T17:34:40.000Z"], "Trip end dates should match");
}

- (void)testTripStartDate
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
    XCTAssertTrue([[dateFormatter stringFromDate: trip.tripStartDate] isEqualToString:@"2014-03-27T17:49:40.000Z"], "Trip start dates should match");
}

@end