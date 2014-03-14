//
//  TripsViewController.m
//  Trippie
//
//  Created by Jordan Wood on 2014-03-12.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TrippieTripsViewController.h"
#import "TrippieTripViewController.h"
#import "TrippieTrip.h"
#import "TrippieDestination.h"

@interface TrippieTripsViewController ()

@property NSMutableArray *tripList;

@end

@implementation TrippieTripsViewController

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    self.tripList = [[NSMutableArray alloc] init];
    [self loadInitialData];
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
 
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

- (void)loadInitialData {
    TrippieTrip *trip1 = [[TrippieTrip alloc] init];
    
    NSDate *today = [NSDate date];
    trip1._id = @"5000000000000";
    trip1.name = @"Test Trip 1";
    trip1.tripStartDate = today;
    trip1.tripEndDate = today;
    
    TrippieDestination *dest1 = [[TrippieDestination alloc] init];
    dest1.name = @"Dest 1";
    dest1._id = @"5000000000001";
    dest1.eventIDs = [[NSMutableArray alloc] init];
    dest1.lodgingIDs = [[NSMutableArray alloc] init];
    dest1.noteIDs = [[NSMutableArray alloc] init];
    
    TrippieDestination *dest2 = [[TrippieDestination alloc] init];
    dest2.name = @"Dest 2";
    dest2._id = @"5000000000002";
    dest2.eventIDs = [[NSMutableArray alloc] init];
    dest2.lodgingIDs = [[NSMutableArray alloc] init];
    dest2.noteIDs = [[NSMutableArray alloc] init];
    
    NSMutableArray *destinationList = [NSMutableArray arrayWithObjects:dest1, dest2, nil];
    trip1.destinationList = destinationList;
    [self.tripList addObject:trip1];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"TripListPrototypeCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
    
    TrippieTrip *theTrip = [self.tripList objectAtIndex:indexPath.row];
    
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:@"MM/dd/yyyy hh:mma"];
    NSString *startDateString = [dateFormat stringFromDate:theTrip.tripStartDate];
    NSString *endDateString = [dateFormat stringFromDate:theTrip.tripEndDate];
    
    // get the labels
    UILabel *lblTripName = (UILabel *)[cell viewWithTag:100];
    UILabel *lblTripStart = (UILabel *)[cell viewWithTag:101];
    UILabel *lblTripEnd = (UILabel *)[cell viewWithTag:102];
    UILabel *lblTripDestinationCount = (UILabel *)[cell viewWithTag:103];
    
    // set the labels
    [lblTripName setText:theTrip.name];
    [lblTripStart setText:[NSString stringWithFormat:@"Start: %@", startDateString]];
    [lblTripEnd setText:[NSString stringWithFormat:@"End: %@", endDateString]];
    [lblTripDestinationCount setText:[NSString stringWithFormat:@"%d destinations", theTrip.destinationList.count]];
    
    return cell;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([[segue identifier] isEqualToString:@"tripSegue"]) {
        TrippieTripViewController *tripViewController = [segue destinationViewController];
        NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
        tripViewController.trip = [self.tripList objectAtIndex:indexPath.row];
    }
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    }   
    else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

/*
#pragma mark - Navigation

// In a story board-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}

 */

@end
