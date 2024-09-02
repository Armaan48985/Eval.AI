'use client';
import LeftNavbar from "@/components/LeftNavbar";
import MonacoEditor from "@/components/MonacoEditor";
import Navbar from "@/components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { barOptions, complexityData, gen, lineOptions, pieOptions } from "@/utils/constant";
import RightSidebar from "@/components/RightSidebar";
import { evaluate, i, parse } from 'mathjs';
import { create, all } from 'mathjs';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const fetchData = async (extPrompt: string, inputCode: string, setResult: (data: any) => void) => {
  try {
    const data = await gen(extPrompt || '', inputCode);
    console.log(extPrompt, inputCode);
    if (data) setResult(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



export type Prompts = {
  id: number;
  prompt: string;
};

export default function Dashboard() {
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<string>('');
  const [showGraphs, setShowGraphs] = useState(false);
  const [graphLoading, setGraphLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [pieVariables, setPieVariables] = useState([]) 
  const [barVariable, setBarvariable] = useState([])
  const [graphLoad, setGraphLoad] = useState(true)
  const [complexity, setComplexity] = useState('');

  function markdownToText(markdown:string) {
    // Remove Markdown headers (##, ###, ####, etc.)
    let text = markdown.replace(/^#{1,6}\s+/gm, '');
  
    // Remove bold (** or __) and italic (* or _) markers
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
  
    // Remove inline code and code blocks (`` ` ``, ``` ``` or ~~~ ~~~)
    text = text.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g, '');
    text = text.replace(/`([^`]+)`/g, '$1');
  
    // Remove lists (ordered and unordered)
    text = text.replace(/^\s*[-*+]\s+/gm, '');
    text = text.replace(/^\s*\d+\.\s+/gm, '');
  
    // Remove any remaining Markdown links [text](url)
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
    // Remove images ![alt](url)
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  
    // Remove any additional Markdown syntax that might still exist
    text = text.replace(/(\<|\>|\!|\[|\]|\(|\))/g, '');
  
    // Convert multiple newlines to a single newline
    text = text.replace(/\n{2,}/g, '\n\n');
  
    // Trim leading and trailing whitespace
    text = text.trim();
  
    return text;
  }
  
  
function getQueryParameter(name: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const userInput = getQueryParameter('input');
const extPrompt = getQueryParameter('prompt');

console.log(extPrompt, inputCode)


useEffect(() => {
  if (extPrompt && inputCode.length > 0) {
    fetchData(extPrompt, inputCode, setResult);
  }
}, [extPrompt, inputCode]);

  const [pieData, setPieData] = useState({
    labels: ['Maintainability', 'Readability', 'Vulnerability', 'Bugs', 'Security Warnings'],
    datasets: [{
      data: [95, 105, 80, 10, 70],
      backgroundColor: [
        'rgba(68, 108, 179, 0.8)', 
        'rgba(255, 159, 64, 0.8)', 
        'rgba(235, 82, 96, 0.8)',
        'rgba(65, 163, 89, 0.8)', 
        'rgba(140, 80, 180, 0.8)'
      ],
      borderColor: [
        'rgba(68, 108, 179, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(235, 82, 96, 1)',
        'rgba(65, 163, 89, 1)',
        'rgba(140, 80, 180, 1)'
      ],
      borderWidth: 1
    }]
  });

  const [exceptionData, setExceptionData] = useState({
    labels: ['IllegalArgEx', 'NullPointerEx', 'ArrayIndexOutOfBoundsEx', 'IOException', 'FileNotFoundEx'],
    datasets: [{
      label: 'Count of Exceptions',
      data: [10,20,30,40,50],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  });
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'n',
          color: '#ffffff',  // Set the x-axis title text color to white
        },
        ticks: {
          color: '#ffffff'  // Set the x-axis tick labels color to white
        }
      },
      y: {
        title: {
          display: true,
          color: '#ffffff',  // Set the y-axis title text color to white
        },
        ticks: {
          color: '#ffffff'  // Set the y-axis tick labels color to white
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',  // Set the legend text color to white
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems:any) => {
            return tooltipItems[0].label;
          },
          label: (tooltipItem:any) => {
            return `y: ${tooltipItem.raw}`;
          }
        },
        bodyColor: '#ffffff',  // Set the tooltip body text color to white
        titleColor: '#ffffff'  // Set the tooltip title text color to white
      }
    }
  };
  
  

  // useEffect(() => {
  //   if (showGraphs) {
  //     if (pieVariables.length > 0) {
  //       setPieData(prevPieData => ({
  //         ...prevPieData,
  //         datasets: prevPieData.datasets.map((dataset, index) => 
  //           index === 0 ? { ...dataset, data: [...pieVariables] } : dataset
  //         )
  //       }));
  //     }
  
  //     if (barVariable.length > 0) {
  //       setExceptionData(prevExceptionData => ({
  //         ...prevExceptionData,
  //         datasets: prevExceptionData.datasets.map((dataset, index) => 
  //           index === 0 ? { ...dataset, data: [...barVariable] } : dataset
  //         )
  //       }));
  //     }
  //   }
  // }, [pieVariables, showGraphs, barVariable]);
  
  
  useEffect(() => {
    if (showGraphs && pieData.datasets[0].data.length > 0 && complexity && 
        pieData.datasets[0].data.every(val => val !== 0) &&
        exceptionData.datasets[0].data.length > 0 &&
        exceptionData.datasets[0].data.every(val => val !== 0)) {
      setGraphLoad(false);
    }
  }, [pieData.datasets[0].data, exceptionData.datasets[0].data, showGraphs, complexity]);


  const math = create(all);

  const generateDataPoints = (expr: string) => {
    const xValues = Array.from({ length: 100 }, (_, i) => i + 1);
    let yValues: number[] = [];
  
    try {
      yValues = xValues.map((n) => {
        const value = math.evaluate(expr, { n });
        return value ?? 1;
      });
    } catch (error) {
      console.error("Invalid expression", error);
      yValues = xValues.map(() => 1);
    }
  
    return { xValues, yValues };
  };

  const sanitizeExpression = (expression: string): string => {
    // Remove all spaces and unwanted characters
    let sanitized = expression.replace(/\s+/g, ''); // Remove all spaces
  
    // Optionally, perform further cleaning to remove any non-mathematical characters
    // Here we're keeping only numbers, n, mathematical operators, and parentheses
    sanitized = sanitized.replace(/[^0-9n+\-*/^().]/g, '');
  
    // Convert common shorthand expressions or normalize inputs
    sanitized = sanitized.replace(/log/g, 'log10'); // Convert log to log10 for uniformity
  
    return sanitized;
  };
  
  const cleanedComplexity = sanitizeExpression(complexity);

  
  
  
  const { xValues, yValues } = generateDataPoints(sanitizeExpression(complexity));

  
  const data = {
    labels: xValues,
    datasets: [
      {
        label: `y = ${complexity}`,
        data: yValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  }
  useEffect(() => {
    if (userInput) {
      setInputCode(userInput);
    }
  }, [userInput]);

  


  return (
    <div className="bg-[#151B2B] w-full min-h-screen flex justify-center overflow-hidden">
      <LeftNavbar setShowGraphs={setShowGraphs} inputCode={inputCode} setPieVariables={setPieVariables} setBarvariable={setBarvariable} setComplexity={setComplexity}/>

      <div className="w-full">
        <Navbar />

        <div className="ml-32 flex items-center mt-10 gap-7 relative">
          <div className="">
          <h1 className="text-lg font-bold text-gray-300 mb-1">Input :</h1>
            <MonacoEditor inputCode={inputCode} setInputCode={setInputCode} />
          </div>

            {showGraphs ? (
              <div className="w-[820px] ml-5 mt-4 h-[630px] mx-auto bg-[#21283B] text-white flex flex-col items-center px-10 py-6 rounded-lg">
                {graphLoad ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <>
                      <div className="w-[430px] h-[500px] mt-[-5rem]">
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                      <div className="flex mt-5 gap-12">
                        <div className="w-[400px] h-[600px]">
                          <Line data={data} options={options} />
                        </div>
                        <div className="w-[350px] h-[600px]">
                          <Bar data={exceptionData} options={barOptions} />
                        </div>
                      </div>
                    </>
                  )}
                      </div>
            ) : (
              <div className="flex justify-center items-center h-[600px]">
              <div>
                <h1 className="text-lg font-bold text-gray-300 mb-1 ">Output :</h1>
                  <textarea
                    className="w-[500px] h-[600px] bg-[#242424] text-white rounded-lg p-6 overflow-auto"
                    value={markdownToText(result)}
                    placeholder="Output will be displayed here..."
                    readOnly
                  />
          </div>
        </div>
      )}

          {!showGraphs && ( 
            <div className=" ">
              <RightSidebar setResult={setResult} inputCode={inputCode} customPrompt={customPrompt} setCustomPrompt={setCustomPrompt}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
