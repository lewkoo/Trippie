//
//  TripTableViewController.m
//  Trippie
//
//  Created by Chris Ventura on 2014-03-19.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TripTableViewController.h"
#import "TripDetailsViewController.h"
#import "SessionManager.h"

@implementation TripTableViewController

- (void)viewDidLoad
{
    self.navigationItem.hidesBackButton = YES;
    self.session = [SessionManager getInstance];
    [super viewDidLoad];
    self.finTripList = [[NSArray alloc] init];
    [self loadInitialData];
}

- (void)loadInitialData {
    [self.session.manager GET:@"trips" parameters:nil success: ^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"trip JSON: %@", responseObject);
        
        // Still can't get this to work, I created a branch called ios-core-data-magical-record-testing to play with some stuff but it wasn't any
        // more successful. I've tried skimming http://ios-blog.co.uk/tutorials/ios-connecting-to-an-online-service-and-persisting-data-with-coredata/
        // and http://www.raywenderlich.com/59255/afnetworking-2-0-tutorial but I wasn't having much success with either...
        self.tripList = (NSArray *)responseObject;
        
        [self.tableView reloadData];
    } failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
    //    [self.tripList addObject:trip1];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return [self.tripList count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:  (NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
    
    NSDictionary *tempDictionary = [self.tripList objectAtIndex:indexPath.row];
    
    // get custom labels
    UILabel *lblTripName = (UILabel *)[cell viewWithTag:100];
    
    // set custom labels
    [lblTripName setText:[tempDictionary objectForKey:@"name"]];
    return cell;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    
    if ([[segue identifier] isEqualToString:@"pushToTripDetails"])
    {
        // Get reference to the destination view controller
        NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
        NSDictionary *trip = [self.tripList objectAtIndex:indexPath.row];
        TripDetailsViewController *dest = [segue destinationViewController];
        dest.tripId = [trip objectForKey:@"_id"];
    }
    
}

- (IBAction)unwindToTrips:(UIStoryboardSegue *)segue
{
    [self loadInitialData];
    [self dismissViewControllerAnimated:YES completion:nil];
}


@end
