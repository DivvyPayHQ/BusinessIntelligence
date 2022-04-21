//
//  RNHChartController.m
//  BusinessIntelligence
//
//  Created by Honz Williams on 4/21/22.
//

#import <Foundation/Foundation.h>
#import "RNHChartController.h"
#import <BusinessIntelligence-Swift.h>

@import Charts;

@interface RNHChartController () < IChartAxisValueFormatter>

@end

typedef struct {
    NSNumber* x;
    NSNumber* y;
} XYValues;

XYValues createXYValues(NSNumber* x, NSNumber* y) {
    XYValues vals;
    vals.x = x;
    vals.y = y;
    return vals;
};

@implementation RCTConvert (XYValues)

RCT_CUSTOM_CONVERTER(XYValues, XYValues, createXYValues(json[@"x"], json[@"y"]) )

@end

@implementation RNHChartController


RCT_EXPORT_MODULE(RNTChart)

RCT_CUSTOM_VIEW_PROPERTY(values, [XYValues], LineChartView) {
  
  NSMutableArray *values = [[NSMutableArray alloc] init];
   
  for (int i = 0; i < [json count]; i++)
  {
     XYValues val = [RCTConvert XYValues:json[i]];
      [values addObject:[[ChartDataEntry alloc] initWithX:[val.x doubleValue] y:[val.y doubleValue] icon: [UIImage imageNamed:@"icon"]]];
  }


 LineChartDataSet *set1 = [[LineChartDataSet alloc] initWithEntries:values label:@""];

  [set1 setColor:UIColor.systemPinkColor];
  [set1 setCircleColor:UIColor.systemPinkColor];
  set1.drawIconsEnabled = NO;
  set1.highlightEnabled = NO;
  set1.lineWidth = 6.0;
  set1.circleRadius = 8.0;
  set1.drawCircleHoleEnabled = NO;
  set1.valueFont = [UIFont systemFontOfSize:9.f];
  set1.drawValuesEnabled = NO;
  set1.formLineWidth = 5.0;
  set1.formSize = 10.0;
  set1.fillColor = [UIColor systemPinkColor];
  set1.drawFilledEnabled = YES;
  
  
  NSMutableArray *dataSets = [[NSMutableArray alloc] init];
  [dataSets addObject:set1];
  
  LineChartData *data = [[LineChartData alloc] initWithDataSets:dataSets];
  
  view.data = data;
}

- (UIView *)view
{
  LineChartView *chart = [LineChartView new];
  [self setUpChart:chart];
  return chart;
}

- (void)setUpChart:(LineChartView*)view
{
  [view setScaleEnabled:YES];
  view.drawGridBackgroundEnabled = NO;
  ChartXAxis *xAxis = view.xAxis;
  xAxis.labelFont = [UIFont systemFontOfSize:11.f];
  xAxis.labelTextColor = UIColor.blackColor;
  xAxis.valueFormatter = self;
  xAxis.granularity = 1.0;
  xAxis.labelPosition = XAxisLabelPositionBottom;
  ChartYAxis *leftAxis = view.leftAxis;
  leftAxis.enabled = YES;
  LargeValueFormatter *formatter = [LargeValueFormatter new];
  leftAxis.valueFormatter = formatter;
  view.rightAxis.enabled = NO;
  
  view.legend.form = nil;
   
}

- (NSString *)stringForValue:(double)value axis:(ChartAxisBase *)axis
{
  NSArray<NSString *> *months = @[
                @"Jan", @"Feb", @"Mar",
                @"Apr", @"May", @"Jun",
                @"Jul", @"Aug", @"Sep",
                @"Oct", @"Nov", @"Dec"
                ];
    return months[(int)value % months.count];
}

@end

