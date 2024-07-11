"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]


type optionsType = {
	name:string;
	checked:DropdownMenuCheckboxItemProps["checked"];
}[]

const initialType: optionsType = [
	{
		name: 'dataOne',
		checked: false
	},
	{
		name: 'dataTwo',
		checked: true
	},
	{
		name: 'dataThree',
		checked: false
	},
	{
		name: 'dataFour',
		checked: true
	},
	{
		name: 'dataFive',
		checked: false
	},
	{
		name: 'dataSix',
		checked: true
	},
	{
		name: 'dataSeven',
		checked: false
	},
	{
		name: 'dataEight',
		checked: true
	},
	{
		name: 'dataNine',
		checked: false
	},
	{
		name: 'dataTen',
		checked: true
	},
	{
		name: 'dataEleven',
		checked: false
	},
	{
		name: 'dataTwelve',
		checked: true
	},
	{
		name: 'dataThirteen',
		checked: false
	},
	{
		name: 'dataFourteen',
		checked: true
	},
	{
		name: 'dataFifteen',
		checked: false
	},
	{
		name: 'dataSixteen',
		checked: true
	},
	{
		name: 'dataSeventeen',
		checked: false
	},
	{
		name: 'dataEighteen',
		checked: true
	},
	{
		name: 'dataNineteen',
		checked: false
	},
	{
		name: 'dataTwenty',
		checked: true
	}
]

const App = () => {

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [options, setOptions] = React.useState<optionsType>(initialType);




  const onClickUncheck = (name: string)=>{
	setOptions(prev =>
		prev.map(eachData =>
		  eachData.name === name ? { ...eachData, checked: false } : eachData
		)
	  )
  }

  const changeSelectedData = (event:boolean, name:string)=>{

    setOptions(prev =>
		prev.map(eachData =>
		  eachData.name === name ? { ...eachData, checked: event } : eachData
		)
	  )

  }

  return (
	<div className="border-2 border-red-600 mt-10 p-8 flex flex-col gap-10 justify-center items-center">
		
		<div className="border-2 border-red-600 p-6 flex justify-start items-center flex-wrap gap-5">

		{
			options?.map((eachData)=> 
				eachData?.checked === true ? <span className="flex gap-2 items-center justify-center border-2 border-red-600 rounded-xl py-2 px-3">
				<p>{eachData?.name}</p><RxCrossCircled className="text-xl text-red-600 hover:scale-110 cursor-pointer" onClick={()=>onClickUncheck(eachData?.name)}/> 
			</span>:''
			
			)
		}
		</div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
	  <DropdownMenuLabel>Custom DropDown</DropdownMenuLabel>
        <DropdownMenuSeparator />
		{
			options?.map((eachData)=> <div>
        <DropdownMenuCheckboxItem
          checked={eachData?.checked}
          onCheckedChange={(event) => changeSelectedData(event, eachData?.name)}
        >
          {eachData?.name}
        </DropdownMenuCheckboxItem>
			</div>)
		}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}


export default App