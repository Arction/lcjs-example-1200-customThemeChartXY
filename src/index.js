/*
 * LightningChart JS Example on ChartXY with Custom Color Theme.
 */
// Import LightningChartJS
const lcjs = require("@arction/lcjs");

const {
  ColorCSS,
  SolidFill,
  SolidLine,
  lightningChart,
  customTheme,
  Themes,
} = lcjs

const xydata = require("@arction/xydata")
const { createProgressiveTraceGenerator } = xydata

const themeTextFillStyle = new SolidFill({ color: ColorCSS('#000000') })
const themeDataSeriesFillStyles = [new SolidFill({ color: ColorCSS('#ffe100') }), new SolidFill({ color: ColorCSS('#858585') })]
const themeAxisFillStyle = new SolidFill({ color: ColorCSS('#000000') })
const themeMajorTickFillStyle = new SolidFill({ color: ColorCSS('#000000') })
const themeMinorTickFillStyle = new SolidFill({ color: ColorCSS('#000000') })
const themeMajorGridlineFillStyle = new SolidFill({ color: ColorCSS('#00000032') })
const themeMinorGridlineFillStyle = new SolidFill({ color: ColorCSS('#00000014') })
const themeUiBackgroundFillStyle = new SolidFill({ color: ColorCSS('#dbdbdb') })
const themeUiBackgroundBorderFillStyle = new SolidFill({ color: ColorCSS('#2b2b2b') })
const themeCursorGridlineFillStyle = new SolidFill({ color: ColorCSS('#000000') })

const myTheme = customTheme(Themes.lightNew, {
  lcjsBackgroundFillStyle: new SolidFill({ color: ColorCSS('#00000000') }),
  panelBackgroundFillStyle: new SolidFill({ color: ColorCSS('#dbd4d3') }),
  seriesBackgroundFillStyle: new SolidFill({ color: ColorCSS('#d4cecd') }),
  chartTitleFillStyle: themeTextFillStyle,
  axisTitleFillStyle: themeTextFillStyle,
  axisStyle: new SolidLine({ thickness: 2, fillStyle: themeAxisFillStyle }),
  numericTickStrategy: Themes.lightNew.numericTickStrategy
      .setMajorTickStyle((majorTicks) =>
          majorTicks
              .setLabelFillStyle(themeTextFillStyle)
              .setTickStyle(new SolidLine({ thickness: 1, fillStyle: themeMajorTickFillStyle }))
              .setGridStrokeStyle(new SolidLine({ thickness: 1, fillStyle: themeMajorGridlineFillStyle })),
      )
      .setMinorTickStyle((minorTicks) =>
          minorTicks
              .setLabelFillStyle(themeTextFillStyle)
              .setTickStyle(new SolidLine({ thickness: 1, fillStyle: themeMinorTickFillStyle }))
              .setGridStrokeStyle(new SolidLine({ thickness: 1, fillStyle: themeMinorGridlineFillStyle })),
      ),
  seriesFillStyle: (i) => themeDataSeriesFillStyles[i % themeDataSeriesFillStyles.length],
  seriesStrokeStyle: (i) => new SolidLine({ thickness: 2, fillStyle: themeDataSeriesFillStyles[i % themeDataSeriesFillStyles.length] }),
  uiBackgroundFillStyle: themeUiBackgroundFillStyle,
  uiBackgroundStrokeStyle: new SolidLine({ thickness: 1, fillStyle: themeUiBackgroundBorderFillStyle }),
  uiTextFillStyle: themeTextFillStyle,
  resultTableFillStyle: themeUiBackgroundFillStyle,
  resultTableStrokeStyle: new SolidLine({ thickness: 1, fillStyle: themeUiBackgroundBorderFillStyle }),
  resultTableTextFillStyle: themeTextFillStyle,
  customTickGridStrokeStyle: new SolidLine({ thickness: 1, fillStyle: themeCursorGridlineFillStyle }),
  uiPointableTextBoxFillStyle: themeUiBackgroundFillStyle,
  uiPointableTextBoxStrokeStyle: new SolidLine({ thickness: 1, fillStyle: themeUiBackgroundBorderFillStyle }),
  uiPointableTextBoxTextFillStyle: themeTextFillStyle,
  pointMarkerFillStyle: new SolidFill({ color: ColorCSS('#000000') }),
  chartXYZoomingRectangleFillStyle: new SolidFill({ color: ColorCSS('#00000016') }),
  chartXYZoomingRectangleStrokeStyle: new SolidLine({ thickness: 1, fillStyle: new SolidFill({ color: ColorCSS('#4f4f4f') }) }),
  chartXYFittingRectangleFillStyle: new SolidFill({ color: ColorCSS('#00000016') }),
  chartXYFittingRectangleStrokeStyle: new SolidLine({ thickness: 1, fillStyle: new SolidFill({ color: ColorCSS('#4f4f4f') }) }),
})

const chart = lightningChart()
  .ChartXY({ theme: myTheme })
  .setPadding({ right: 20 })
  .setTitle('Custom \"simple light gold\" Theme ChartXY')

for (let i = 1; i <= 2; i += 1) {
  const series = chart.addLineSeries({
      dataPattern: {
          pattern: 'ProgressiveX',
      },
  })

  createProgressiveTraceGenerator()
      .setNumberOfPoints(100 * 1000)
      .generate()
      .toPromise()
      .then((data) => {
          series.add(data)
      })
}

const legend = chart.addLegendBox().add(chart)
