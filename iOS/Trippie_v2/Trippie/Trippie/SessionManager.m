//
//  SessionManager.m
//  Trippie
//
//  Created by David John Horsman on 2014-03-14.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "SessionManager.h"

@implementation SessionManager

@synthesize manager;

static SessionManager *instance = nil;

+(SessionManager *)getInstance {
    @synchronized(self)
    {
        if(instance==nil)
        {
            
            instance= [SessionManager new];
            instance.manager = [[AFHTTPRequestOperationManager alloc] initWithBaseURL:[NSURL URLWithString:@"http://ec2-54-186-105-73.us-west-2.compute.amazonaws.com/api/"]];
            [instance.manager setRequestSerializer:[AFHTTPRequestSerializer serializer]];
            [instance.manager setResponseSerializer:[AFJSONResponseSerializer serializer]];
//            [instance.manager setResponseSerializer:[AFHTTPResponseSerializer serializer]];
        }
    }
    return instance;
}

@end
