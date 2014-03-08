//
//  WXController.m
//  SimpleWeather
//
//  Created by Levko Ivanchuk on 2014-03-08.
//  Copyright (c) 2014 Levko Ivanchuk. All rights reserved.
//

#import "WXController.h"

@interface WXController ()

@end

@implementation WXController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // Remove this later
    self.view.backgroundColor = [UIColor redColor];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
