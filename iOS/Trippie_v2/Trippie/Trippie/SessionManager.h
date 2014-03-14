//
//  SessionManager.h
//  Trippie
//
//  Created by David John Horsman on 2014-03-14.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AFNetworking.h"

@interface SessionManager : NSObject {
    
    AFHTTPRequestOperationManager *manager;
    
}

@property(nonatomic,retain) AFHTTPRequestOperationManager *manager;
+(SessionManager*)getInstance;

@end
