    //
//  TripDetailsViewController.m
//  Trippie
//
//  Created by Chris Ventura on 2014-03-22.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TripDetailsViewController.h"

@interface TripDetailsViewController ()


@end

@implementation TripDetailsViewController
@synthesize tripId;
@synthesize session;
@synthesize tripData;

@synthesize lblName;
@synthesize lblStartDate;
@synthesize lblEndDate;
@synthesize tblDestinationList;

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
    self.session = [SessionManager getInstance];
    [super viewDidLoad];
    [self loadData];
    // Do any additional setup after loading the view.
}

- (void)loadData
{
    NSString *tripUrl = [NSString stringWithFormat:@"trips/%@", self.tripId];
    
    [self.session.manager GET:tripUrl parameters:nil success: ^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"trip JSON: %@", responseObject);
        
        tripData = [[TrippieTrip alloc] initWithData:responseObject];
        [self showData];
    } failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];

}

- (void) showData
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"MM/dd/yyyy 'at' hh:mma"];
    
    lblName.text = self.tripData.name;
    lblStartDate.text = [dateFormatter stringFromDate:self.tripData.tripStartDate];
    lblEndDate.text = [dateFormatter stringFromDate:self.tripData.tripEndDate];
    [tblDestinationList reloadData];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return [self.tripData.destinationList count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:  (NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
    
    NSDictionary *tempDictionary = [self.tripData.destinationList objectAtIndex:indexPath.row];
    
    // get custom labels
    UILabel *lblTripName = (UILabel *)[cell viewWithTag:100];
    
    // set custom labels
    [lblTripName setText:[tempDictionary objectForKey:@"name"]];
    return cell;
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
