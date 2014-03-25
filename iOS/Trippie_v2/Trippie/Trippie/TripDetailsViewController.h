//
//  TripDetailsViewController.h
//  Trippie
//
//  Created by Chris Ventura on 2014-03-22.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SessionManager.h"
#import "TrippieTrip.h"

@interface TripDetailsViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

@property (weak, nonatomic) IBOutlet UILabel *lblName;
@property (weak, nonatomic) IBOutlet UILabel *lblStartDate;
@property (weak, nonatomic) IBOutlet UILabel *lblEndDate;
@property (weak, nonatomic) IBOutlet UITableView *tblDestinationList;

@property (nonatomic, strong) NSString *tripId;
@property SessionManager *session;
@property TrippieTrip *tripData;

@end
