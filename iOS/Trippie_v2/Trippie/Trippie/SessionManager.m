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
            instance.manager = [[AFHTTPRequestOperationManager alloc] initWithBaseURL:[NSURL URLWithString:@"http://ec2-54-84-55-183.compute-1.amazonaws.com:3000/api/"]];
            [instance.manager setRequestSerializer:[AFHTTPRequestSerializer serializer]];
        }
    }
    return instance;
}

@end
