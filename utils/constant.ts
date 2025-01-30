
import { GoogleGenerativeAI } from "@google/generative-ai";

export const defaultPrompts = [
    {
      id: 1,
      prompt: 'Add comments to the code without any extra explanation. Do not use any formatting elements such as ** for bold or anything else. I want just a simple clean code output that I can run in any IDE without any changes. Add the comments inside the code. ',
    },
    {
      id: 2,
      prompt: 'Suggest only function names in short with very little description (don’t add unnecessary text): ',
    },
    {
      id: 3,
      prompt: 'Give me a very short review of the code. What is the code doing? What is the purpose of the code? What are the possible improvements that can be made? What are the possible bugs that can be there in the code? What are the possible edge cases that can be there in the code?'
    },
    {
      id: 4,
      prompt: 'Give a short answer on the selected codes Time complexity, as well as tell me why is it that.'
    },
    {
      id: 5,
      prompt: `
Generate at least 5 test cases for the code given.
.
`
    }
  ];
  

  
  
  export const maintainabilityData = {
    labels: ['functionA', 'functionB', 'functionC', 'functionD', 'functionE'],
    datasets: [{
      label: 'Maintainability Index',
      data: [80, 65, 90, 70, 85], // Maintainability scores
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Example color
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
  
  export const complexityData = {
    labels: ['functionA', 'functionB', 'functionC', 'functionD', 'functionE'],
    datasets: [{
      label: 'Cyclomatic Complexity',
      data: [2, 5, 3, 4, 6], // Complexity scores
      backgroundColor: 'rgba(255, 159, 64, 0.2)', // Example color
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };
  
  
  
  export const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left' as const, // Position the legend to the left of the chart
        labels: {
          font: {
            size: 14, // Font size for legend labels
          },
          color: 'white', // Color for legend labels
          boxWidth: 7, // Width of the legend box
          boxHeight: 7, // Height of the legend box
          padding: 7, // Padding between legend items
          usePointStyle: true, // Use point style for the legend
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: {
        left: 20,
      },
      margin:{
        right: 20,
      }
    },
  };
  
  
  export const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Cyclomatic Complexity Over Functions',
        font: {
          size: 16
        },
        color: 'white',
        padding: {
          top: 20,
          bottom: 20
        }
      },
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12
          },
          color: 'white',
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem:any) {
            return `Complexity: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 8
          },
           color: 'white',
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: 8
          },
           color: 'white',
          beginAtZero: true
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };
  
  export const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Maintainability Index by Function',
        font: {
          size: 18
        },
           color: 'white',
        padding: {
          top: 10,
          bottom: 10
        }
      },
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 8
          },
           color: 'white',
          boxWidth: 10 // Adjust this to control the size of the legend color box
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem:any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} points`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 8
          },
          color: 'white',
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: 8
          },
           color: 'white',
          beginAtZero: true
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };
  export const gen = async (prompt: string, inputCode: string): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyD3MFtvYQmTNV7zY5DC87mK-jHsgLe2c_');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const finalPrompt = `${prompt}\n${inputCode}`;
      const result = await model.generateContent(finalPrompt);

      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      return 'An error occurred while generating content.';
    }
  };