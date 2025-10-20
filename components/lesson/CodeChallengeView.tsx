import React, { useState } from 'react';
import { CodingChallenge } from '../../types';
import WarmCodeEditor from './WarmCodeEditor';
import AdventureButton from '../ui/AdventureButton';
import ParchmentCard from '../ui/ParchmentCard';
import { Check, X, Loader, Terminal, FileText, ListChecks } from 'lucide-react';

interface CodeChallengeViewProps {
  challenge: CodingChallenge;
  onComplete: (challenge: CodingChallenge) => void;
  onNext: () => void;
}

type TestResult = 'passed' | 'failed' | 'error' | 'pending';
type LeftPanelTab = 'description' | 'testCases';

interface Result {
  status: TestResult;
  input: string;
  expected: string;
  received: string;
  description?: string;
}

const CodeChallengeView: React.FC<CodeChallengeViewProps> = ({ challenge, onComplete, onNext }) => {
  const [code, setCode] = useState(challenge.starterCode || '');
  const [results, setResults] = useState<Result[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [activeTab, setActiveTab] = useState<LeftPanelTab>('description');

  const handleRunCode = () => {
    if (!challenge.testCases || !challenge.functionName) return;
    setIsRunning(true);
    setResults([]);

    setTimeout(() => {
      const newResults: Result[] = [];
      let passedCount = 0;

      const testRunnerPreamble = `
        class ListNode {
          constructor(val, next) {
            this.val = (val===undefined ? 0 : val);
            this.next = (next===undefined ? null : next);
          }
        }
        class TreeNode {
            constructor(val, left, right) {
                this.val = (val===undefined ? 0 : val);
                this.left = (left===undefined ? null : left);
                this.right = (right===undefined ? null : right);
            }
        }

        function arrayToLinkedList(arr) {
          if (!arr || arr.length === 0) return null;
          let head = new ListNode(arr[0]);
          let current = head;
          for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
          }
          return head;
        }

        function linkedListToArray(head) {
          const arr = [];
          let current = head;
          while(current) {
            arr.push(current.val);
            current = current.next;
          }
          return arr;
        }

        function arrayToTree(arr) {
          if (!arr || arr.length === 0 || arr[0] === null) return null;
          const root = new TreeNode(arr[0]);
          const queue = [root];
          let i = 1;
          while (queue.length > 0 && i < arr.length) {
              const node = queue.shift();
              if (node) {
                  if (i < arr.length && arr[i] !== null) {
                      node.left = new TreeNode(arr[i]);
                      queue.push(node.left);
                  }
                  i++;
                  if (i < arr.length && arr[i] !== null) {
                      node.right = new TreeNode(arr[i]);
                      queue.push(node.right);
                  }
                  i++;
              }
          }
          return root;
        }
      `;

      for (const testCase of challenge.testCases!) {
        let received: any;
        let status: TestResult = 'pending';
        
        try {
          let testExecutionCode = '';
          
          // --- Custom logic for data structure (DS) challenges ---
          if (challenge.id === 'js_ds_02_revlist') {
            testExecutionCode = `
              const inputList = arrayToLinkedList(${JSON.stringify(testCase.input[0])});
              const resultList = ${challenge.functionName}(inputList);
              return linkedListToArray(resultList);
            `;
          } else if (challenge.id === 'js_ds_03_maxtree') {
             testExecutionCode = `
              const inputTree = arrayToTree(${JSON.stringify(testCase.input[0])});
              return ${challenge.functionName}(inputTree);
            `;
          }
          else {
            testExecutionCode = `return ${challenge.functionName}(...${JSON.stringify(testCase.input)});`;
          }

          const fullCode = `
            try {
              ${testRunnerPreamble}
              ${code} 
              ${testExecutionCode}
            } catch(e) {
              return { __error: e.toString() };
            }
          `;

          const result = new Function(fullCode)();
          
          if (result && result.__error) {
              throw new Error(result.__error);
          }
          
          received = result;
          
          if (JSON.stringify(received) === JSON.stringify(testCase.expected)) {
            status = 'passed';
            passedCount++;
          } else {
            status = 'failed';
          }

        } catch (error: any) {
          status = 'error';
          received = error.message || 'An unknown error occurred.';
        }

        newResults.push({
          status,
          input: JSON.stringify(testCase.input),
          expected: JSON.stringify(testCase.expected),
          received: JSON.stringify(received),
          description: testCase.description,
        });
      }
      
      setResults(newResults);
      setIsRunning(false);
      setIsSubmitted(true);
      const allTestsPassed = passedCount === challenge.testCases!.length;
      setAllPassed(allTestsPassed);
      if (allTestsPassed) {
        onComplete(challenge);
      }
    }, 500);
  };

  const ResultIcon: React.FC<{ status: TestResult }> = React.memo(({ status }) => {
    switch (status) {
      case 'passed': return <Check size={18} className="text-success-green flex-shrink-0 mt-1" />;
      case 'failed': return <X size={18} className="text-health-red flex-shrink-0 mt-1" />;
      case 'error': return <X size={18} className="text-amber-glow flex-shrink-0 mt-1" />;
      default: return <Loader size={18} className="animate-spin text-shadow-soft flex-shrink-0 mt-1" />;
    }
  });

  const TabButton: React.FC<{ tabName: LeftPanelTab, label: string, icon: React.ReactNode }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-2 py-2 px-4 font-heading text-sm rounded-t-lg transition-colors ${activeTab === tabName ? 'bg-parchment-medium border-b-2 border-warm-gold text-ink-dark' : 'text-shadow-soft hover:bg-parchment-dark'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
      {/* Left Panel: Description & Test Cases */}
      <ParchmentCard className="p-0 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 flex border-b-2 border-amber-glow/20 px-4">
            <TabButton tabName="description" label="Description" icon={<FileText size={16}/>} />
            <TabButton tabName="testCases" label="Test Cases" icon={<ListChecks size={16}/>} />
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
            {activeTab === 'description' && (
                <div className="animate-fade-in" style={{animationDuration: '0.3s'}}>
                    <p className="font-body text-sm text-shadow-soft capitalize">{challenge.difficulty}</p>
                    <h3 className="font-heading text-2xl font-bold mt-1 mb-4">{challenge.title}</h3>
                    <div className="prose prose-sm font-body text-ink-dark max-w-none" dangerouslySetInnerHTML={{ __html: challenge.question.replace(/`([^`]+)`/g, '<code class="bg-parchment-dark rounded p-1 text-sm font-mono">$&</code>').replace(/`/g, '') }} />
                </div>
            )}
             {activeTab === 'testCases' && (
                <div className="animate-fade-in" style={{animationDuration: '0.3s'}}>
                    <h4 className="font-heading font-semibold text-lg">Examples:</h4>
                    {challenge.testCases?.map((tc, index) => (
                        <div key={index} className="bg-parchment-dark p-3 rounded-md text-sm my-2 font-mono text-ink-dark/80 overflow-x-auto">
                            <p className="font-semibold mb-1">Example {index + 1}:</p>
                            <div><strong>Input:</strong> {JSON.stringify(tc.input)}</div>
                            <div><strong>Expected Output:</strong> {JSON.stringify(tc.expected)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </ParchmentCard>

      {/* Right Panel: Editor & Results */}
      <div className="flex flex-col h-full overflow-hidden">
        <ParchmentCard className="flex-grow flex flex-col p-0 overflow-hidden">
             <div className="flex-grow relative">
                <div className="absolute inset-0">
                    <WarmCodeEditor defaultValue={code} onChange={(value) => setCode(value || '')} />
                </div>
            </div>
        </ParchmentCard>
        <div className="flex-shrink-0 mt-4 p-4 bg-parchment-dark/50 rounded-lg border border-amber-glow/20">
            <div className="h-32 overflow-y-auto pr-2">
                <h4 className="font-heading text-lg font-bold flex items-center mb-2"><Terminal size={20} className="mr-2"/> Console</h4>
                 {!isSubmitted && !isRunning &&  <p className="font-body text-shadow-soft text-sm p-2">Your test results will appear here.</p>}
                 {isRunning && <div className="flex items-center text-shadow-soft p-2"><Loader size={18} className="animate-spin mr-2" /> <span>Running tests...</span></div>}
                 {isSubmitted && results.map((res, i) => (
                    <div key={i} className={`font-mono text-sm flex items-start p-2 border-b border-amber-glow/10 ${res.status === 'passed' ? 'text-success-green/80' : 'text-health-red'}`}>
                        <ResultIcon status={res.status} />
                        <div className="ml-2">
                            <p className="font-semibold">{res.description || `Test Case ${i + 1}`}: <span className="uppercase font-bold">{res.status}</span></p>
                            {res.status !== 'passed' && <p className="text-xs text-shadow-soft">Expected {res.expected}, but got {res.received}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
                {isSubmitted && allPassed ? (
                    <AdventureButton onClick={onNext} className="bg-success-green border-green-700 shadow-adventure-press active:shadow-adventure-press-active">Continue</AdventureButton>
                ) : (
                    <AdventureButton onClick={handleRunCode} disabled={isRunning}>
                        {isRunning ? 'Running...' : isSubmitted ? 'Try Again' : 'Run Tests'}
                    </AdventureButton>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CodeChallengeView;
