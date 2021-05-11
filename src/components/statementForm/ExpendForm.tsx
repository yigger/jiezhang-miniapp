import React, { useState } from 'react'
import { View, Input, Picker } from '@tarojs/components'
import { Button } from '@/src/common/components'
import CategorySelect from './CategorySelect'
import jz from '@/jz'

const form = {
  type: 'expend',
  amount: 0,
}

export default function ExpendForm() {
  const [form, setForm] = useState({
    type: 'expend',
    amount: 0,
  })
  const [categorySelectActive, setCategorySelectActive] = useState(false)
  const [assetSelectActive, setAssetSelectActive] = useState(false)
  const [categoryList, setCategoryList] = useState({
    frequent: [],
    data: []
  })
  const [assetList, setAssetList] = useState({
    frequent: [],
    data: []
  })



  function handleCategoryItemClick (item) {
    console.log(item)
    setCategorySelectActive(false)
  }

  function handleAssetItemClick (item) {
    console.log(item)
    setAssetSelectActive(false)
  }

  async function  getCategories() {
    setCategorySelectActive(true)
    const st = await jz.api.statements.categoriesWithForm()
    if (st.isSuccess) {
      setCategoryList({ frequent: st.data.frequent, data: st.data.categories })
    }
  }

  async function  getAssets() {
    setAssetSelectActive(true)
    const st = await jz.api.statements.assetsWithForm()
    if (st.isSuccess) {
      setAssetList({ frequent: st.data.frequent, data: st.data.categories })
    }
  }

  return (
    <View>
      <View>
        <View className='statement-form__expend-form'>
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>金额</View>
              <View><Input type='text' value={form.amount} placeholder='0.00'></Input></View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>分类</View>
              <View onClick={getCategories}>请输入分类</View>
            </View>
            <View className='statement-form__quick-select'>
              <View className='ui label'>日常用品</View>
              <View className='ui label'>一日三餐</View>
              <View className='ui label'>游戏</View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>资产</View>
              <View onClick={getAssets}>请输入资产</View>
            </View>
            <View className='statement-form__quick-select'>
              <View className='ui label'>建设银行</View>
              <View className='ui label'>微信支付</View>
              <View className='ui label'>支付宝</View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>日期</View>
              <View>
                <Picker mode='date'>
                  <View className='picker'>
                    2021-05-04
                  </View>
                </Picker>
              </View>
            </View>
          </View>
    
          <View>
            <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
              <View>时间</View>
              <View>
                <Picker mode='time'>
                  <View className='picker'>
                    21:16
                  </View>
                </Picker>
              </View>
            </View>
          </View>

          <View>
            <Button title='提交'></Button>
          </View>
        </View>
      </View>

      {
        categorySelectActive && 
        (<CategorySelect
           handleClick={handleCategoryItemClick}
           frequent={categoryList.frequent}
           data={categoryList.data}
         />)
      }

      {
        assetSelectActive && 
        (<CategorySelect
           handleClick={handleAssetItemClick}
           frequent={assetList.frequent}
           data={assetList.data}
         />)
      }
    </View>
  )
}

// class ExpendForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       form: form,
//       modalActive: null,
//       categorySelectActive: false,
//       assetSelectActive: false,
//       categoryList: {
//         frequent: [],
//         data: []
//       },
//       assetList: {
//         frequent: [],
//         data: []
//       }
//     }
//   }

//   handleCategoryItemClick (item) {
//     console.log(item)
//     this.setState({ categorySelectActive: false })
//   }

//   handleAssetItemClick (item) {
//     console.log(item)
//     this.setState({ assetSelectActive: false })
//   }

//   async getCategories() {
//     this.setState({ categorySelectActive: true })
//     const st = await jz.api.statements.categoriesWithForm()
//     if (st.isSuccess) {
//       this.setState({ categoryList: { frequent: st.data.frequent, data: st.data.categories } })
//     }
//   }

//   async getAssets() {
//     this.setState({ assetSelectActive: true })
//     const st = await jz.api.statements.assetsWithForm()
//     if (st.isSuccess) {
//       this.setState({ assetList: { frequent: st.data.frequent, data: st.data.categories } })
//     }
//   }

//   render () {
//     return (
//       <View>
//         <View>
//           <View className='statement-form__expend-form'>
//             <View>
//               <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
//                 <View>金额</View>
//                 <View><Input type='text' value={this.state.form.amount} placeholder='0.00'></Input></View>
//               </View>
//             </View>
      
//             <View>
//               <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
//                 <View>分类</View>
//                 <View onClick={this.getCategories.bind(this)}>请输入分类</View>
//               </View>
//               <View className='statement-form__quick-select'>
//                 <View className='ui label'>日常用品</View>
//                 <View className='ui label'>一日三餐</View>
//                 <View className='ui label'>游戏</View>
//               </View>
//             </View>
      
//             <View>
//               <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
//                 <View>资产</View>
//                 <View onClick={this.getAssets.bind(this)}>请输入资产</View>
//               </View>
//               <View className='statement-form__quick-select'>
//                 <View className='ui label'>建设银行</View>
//                 <View className='ui label'>微信支付</View>
//                 <View className='ui label'>支付宝</View>
//               </View>
//             </View>
      
//             <View>
//               <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
//                 <View>日期</View>
//                 <View>
//                   <Picker mode='date'>
//                     <View className='picker'>
//                       {/* {this.state.dateSel} */}
//                       2021-05-04
//                     </View>
//                   </Picker>
//                 </View>
//               </View>
//             </View>
      
//             <View>
//               <View className='f-column d-flex p-4 text-align-right flex-between flex-center'>
//                 <View>时间</View>
//                 <View>
//                   <Picker mode='time'>
//                     <View className='picker'>
//                       21:16
//                     </View>
//                   </Picker>
//                 </View>
//               </View>
//             </View>

//             <View>
//               <Button title='提交'></Button>
//             </View>
//           </View>
//         </View>

//         {
//           this.state.categorySelectActive && 
//           (<CategorySelect
//              afterClick={this.handleCategoryItemClick.bind(this)}
//              frequent={this.state.categoryList.frequent}
//              data={this.state.categoryList.data}
//            />)
//         }

//         {
//           this.state.assetSelectActive && 
//           (<CategorySelect
//              afterClick={this.handleAssetItemClick.bind(this)}
//              frequent={this.state.assetList.frequent}
//              data={this.state.assetList.data}
//            />)
//         }
//       </View>
//     )
//   }
// }