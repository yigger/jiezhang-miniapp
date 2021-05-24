/*
*  创建账单的请求参数
*/
export type StatementForm = {
  type: string,
  amount: string,
  category_id: number,
  asset_id: number,
  date: string,
  time: string
  description?: string
}