//
//  WXDailyForecast.m
//  SimpleWeather
//
//  Created by Levko Ivanchuk on 2014-03-08.
//  Copyright (c) 2014 Levko Ivanchuk. All rights reserved.
//

#import "WXDailyForecast.h"

@implementation WXDailyForecast

+ (NSDictionary *)JSONKeyPathsByPropertyKey {
    // 1
    NSMutableDictionary *paths = [[super JSONKeyPathsByPropertyKey] mutableCopy];
    // 2
    paths[@"tempHigh"] = @"temp.max";
    paths[@"tempLow"] = @"temp.min";
    // 3
    return paths;
}


@end
