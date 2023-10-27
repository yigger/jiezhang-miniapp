import Request from '../request'

export default class SuperChart extends Request {
  getHeader(params) {
    return this.get('/super_chart/header', params)
  }

  getPieData(params) {
    return this.get("/super_chart/get_pie_data", params)
  }

  getWeekData(params) {
    return this.get("/super_chart/week_data", params)
  }

  getLineData({ year }) {
    return this.get("/super_chart/line_chart", { year: year })
  }

  getCategoriesTop({ year, month }) {
    return this.get("/super_chart/categories_list", { year: year, month: month })
  }
  
  getTableSumary({ year, month }) {
    return this.get("v2/super_chart/table_sumary", { year: year, month: month })
  }

}
