import React, { useState, useEffect } from 'react';
import { FileNode, Language, MagiResponse, Vote } from '../../types';
import { Folder, FileText, ArrowLeft, ShieldAlert, Cpu, X, FilePlus, FolderPlus, Save, Trash2, Edit3, AlertTriangle } from 'lucide-react';
import { MOCK_FILE_SYSTEM } from '../../services/fileSystem';
import { consultMagi } from '../../services/magiService';

interface FileManagerProps {
  language: Language;
  isEmergency?: boolean;
}

type ModalType = 'CREATE' | 'RENAME' | 'DELETE' | 'ANALYSIS' | null;

const FileManager: React.FC<FileManagerProps> = ({ language, isEmergency = false }) => {
  // Navigation State
  const [currentPath, setCurrentPath] = useState<FileNode[]>([MOCK_FILE_SYSTEM]);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  
  // Operation State
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Editor State
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  // Form State
  const [inputName, setInputName] = useState('');
  const [inputType, setInputType] = useState<'FILE' | 'DIR'>('FILE');

  // MAGI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MagiResponse | null>(null);

  const currentFolder = currentPath[currentPath.length - 1];

  // Theme Helpers
  const mainColor = isEmergency ? 'text-red-500' : 'text-magi-orange';
  const borderColor = isEmergency ? 'border-red-500' : 'border-magi-orange';
  const hoverBg = isEmergency ? 'hover:bg-red-500/10' : 'hover:bg-magi-orange/10';
  const accentBg = isEmergency ? 'bg-red-500' : 'bg-magi-orange';
  const dimBorder = isEmergency ? 'border-red-500/30' : 'border-magi-orange/30';

  // --- Navigation Helpers ---

  const handleSelect = (node: FileNode) => {
    setSelectedNode(node);
    if (node.type === 'FILE') {
        setEditorContent(node.content || '');
        setIsEditingContent(false);
    }
  };

  const handleEnter = (node: FileNode) => {
    if (node.type === 'DIR') {
      setCurrentPath([...currentPath, node]);
      setSelectedNode(null);
      setIsEditingContent(false);
    }
  };

  const handleUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedNode(null);
      setIsEditingContent(false);
    }
  };

  // --- CRUD Operations ---

  const openCreateModal = (type: 'FILE' | 'DIR') => {
    setInputType(type);
    setInputName('');
    setEditorContent(''); // clear for new file content
    setActiveModal('CREATE');
  };

  const handleCreate = () => {
    if (!inputName.trim()) return;

    const newNode: FileNode = {
        id: `node-${Date.now()}`,
        name: inputName,
        type: inputType,
        content: inputType === 'FILE' ? editorContent : undefined,
        size: inputType === 'FILE' ? `${(editorContent.length / 1024).toFixed(1)}KB` : undefined,
        date: new Date().toISOString().split('T')[0],
        securityLevel: 'USER',
        children: inputType === 'DIR' ? [] : undefined
    };

    if (!currentFolder.children) currentFolder.children = [];
    currentFolder.children.push(newNode);
    
    refreshView();
    closeModal();
  };

  const openRenameModal = () => {
    if (!selectedNode) return;
    setInputName(selectedNode.name);
    setActiveModal('RENAME');
  };

  const handleRename = () => {
    if (!selectedNode || !inputName.trim()) return;
    selectedNode.name = inputName;
    refreshView();
    closeModal();
  };

  const openDeleteModal = () => {
    if (!selectedNode) return;
    setActiveModal('DELETE');
  };

  const handleDelete = () => {
    if (!selectedNode || !currentFolder.children) return;
    currentFolder.children = currentFolder.children.filter(n => n.id !== selectedNode.id);
    setSelectedNode(null);
    refreshView();
    closeModal();
  };

  const handleSaveContent = () => {
    if (!selectedNode || selectedNode.type !== 'FILE') return;
    selectedNode.content = editorContent;
    selectedNode.size = `${(editorContent.length / 1024).toFixed(1)}KB`;
    selectedNode.date = new Date().toISOString().split('T')[0];
    setIsEditingContent(false);
    refreshView();
  };

  // --- MAGI Integration ---

  const handleMagiAnalyze = async () => {
    if (!selectedNode) return;
    
    setIsAnalyzing(true);
    setActiveModal('ANALYSIS');
    setAnalysisResult(null);

    try {
      const prompt = language === 'CN' 
        ? `请作为MAGI系统分析这份NERV档案文件。文件名: ${selectedNode.name}。文件内容: ${selectedNode.content || "无法读取内容"}。请评估该文件的安全风险、情报价值或隐藏含义。`
        : `Analyze this NERV archive file as the MAGI system. Filename: ${selectedNode.name}. Content: ${selectedNode.content || "Unreadable"}. Assess security risks, intelligence value, or hidden implications.`;

      const result = await consultMagi(prompt, language);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed", error);
      closeModal();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Utils ---

  const refreshView = () => setCurrentPath([...currentPath]); // Trigger re-render
  
  const closeModal = () => {
    setActiveModal(null);
    setIsAnalyzing(false);
  };

  // --- Localization ---

  const labels = {
    back: language === 'CN' ? '返回' : 'BACK',
    name: language === 'CN' ? '名称' : 'FILENAME',
    size: language === 'CN' ? '大小' : 'SIZE',
    security: language === 'CN' ? '密级' : 'SECURITY',
    empty: language === 'CN' ? '目录为空' : 'DIRECTORY EMPTY',
    preview: language === 'CN' ? '预览' : 'PREVIEW',
    edit: language === 'CN' ? '编辑' : 'EDIT',
    save: language === 'CN' ? '保存' : 'SAVE',
    cancel: language === 'CN' ? '取消' : 'CANCEL',
    delete: language === 'CN' ? '删除' : 'DELETE',
    rename: language === 'CN' ? '重命名' : 'RENAME',
    newFile: language === 'CN' ? '新建文件' : 'NEW FILE',
    newFolder: language === 'CN' ? '新建文件夹' : 'NEW FOLDER',
    confirmDelete: language === 'CN' ? '确认删除此项目？' : 'CONFIRM DELETION?',
    warning: language === 'CN' ? '此操作不可逆。' : 'THIS ACTION IS IRREVERSIBLE.',
    analyze: language === 'CN' ? 'MAGI 解析' : 'MAGI ANALYZE',
    analyzing: language === 'CN' ? '正在分析数据模式...' : 'ANALYZING DATA PATTERNS...',
    consensus: language === 'CN' ? '最终决议' : 'CONSENSUS',
    enterName: language === 'CN' ? '输入名称...' : 'ENTER NAME...',
    enterContent: language === 'CN' ? '输入内容...' : 'ENTER CONTENT...',
    create: language === 'CN' ? '创建' : 'CREATE',
    confirm: language === 'CN' ? '确认' : 'CONFIRM',
  };

  return (
    <div className={`w-full h-full flex flex-col ${mainColor} font-mono text-sm relative select-none`}>
      
      {/* --- MODALS --- */}

      {/* MAGI Analysis Modal */}
      {activeModal === 'ANALYSIS' && (
        <div className="absolute inset-0 z-30 bg-black/95 flex flex-col animate-in fade-in duration-200">
           <div className={`flex justify-between items-center p-2 ${dimBorder} border-b bg-magi-dark/50`}>
              <span className="flex items-center gap-2 font-bold animate-pulse">
                <Cpu size={16} />
                MAGI SYSTEM // {selectedNode?.name}
              </span>
              {!isAnalyzing && <button onClick={closeModal} className="hover:text-white"><X size={16} /></button>}
           </div>
           <div className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-4">
              {isAnalyzing ? (
                 <div className="text-center">
                    <div className={`animate-spin mb-4 mx-auto w-12 h-12 border-4 ${isEmergency ? 'border-red-500' : 'border-magi-orange'} border-t-transparent rounded-full`}></div>
                    <div className="text-lg tracking-widest animate-pulse">{labels.analyzing}</div>
                 </div>
              ) : analysisResult ? (
                 <div className="w-full h-full flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        {analysisResult.results.map((res, idx) => (
                           <div key={idx} className={`border p-2 flex flex-col gap-1 ${
                               res.vote === Vote.APPROVE ? 'border-green-500 text-green-500' : 
                               res.vote === Vote.DENY ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'
                           }`}>
                              <div className="font-bold border-b border-current pb-1 mb-1">{res.nodeName}</div>
                              <div className="opacity-80 leading-tight min-h-[40px]">{res.reasoning}</div>
                              <div className="font-bold text-right mt-auto pt-2">{res.vote}</div>
                           </div>
                        ))}
                    </div>
                    <div className={`mt-auto border-t-2 ${borderColor} pt-4 text-center`}>
                       <div className="text-[10px] tracking-[0.5em] opacity-70 mb-2">{labels.consensus}</div>
                       <div className={`text-2xl font-black ${accentBg} text-black inline-block px-4 py-1`}>
                          {analysisResult.consensus}
                       </div>
                    </div>
                 </div>
              ) : null}
           </div>
        </div>
      )}

      {/* Create / Rename Modal */}
      {(activeModal === 'CREATE' || activeModal === 'RENAME') && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center p-8 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className={`w-full max-w-md border-2 ${borderColor} bg-black shadow-[0_0_20px_rgba(255,153,0,0.2)] p-4 flex flex-col gap-4`}>
                <div className={`font-bold border-b ${dimBorder} pb-2 text-lg flex justify-between items-center`}>
                    <span>
                        {activeModal === 'CREATE' 
                            ? (inputType === 'FILE' ? labels.newFile : labels.newFolder) 
                            : labels.rename}
                    </span>
                    {activeModal === 'CREATE' ? <FilePlus size={20} /> : <Edit3 size={20} />}
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-xs opacity-70">NAME</label>
                    <input 
                        type="text" 
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder={labels.enterName}
                        autoFocus
                        className={`bg-magi-dark/50 border ${dimBorder} p-2 ${mainColor} outline-none focus:${borderColor} placeholder-opacity-30`}
                    />
                </div>

                {/* Content Input only for New File */}
                {activeModal === 'CREATE' && inputType === 'FILE' && (
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-xs opacity-70">CONTENT</label>
                        <textarea 
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                            placeholder={labels.enterContent}
                            className={`bg-magi-dark/50 border ${dimBorder} p-2 ${mainColor} outline-none focus:${borderColor} placeholder-opacity-30 min-h-[100px] resize-none`}
                        />
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={closeModal} className={`px-4 py-1 border ${dimBorder} ${hoverBg} transition-colors`}>{labels.cancel}</button>
                    <button 
                        onClick={activeModal === 'CREATE' ? handleCreate : handleRename}
                        disabled={!inputName.trim()}
                        className={`px-4 py-1 ${accentBg} text-black font-bold hover:bg-white transition-colors disabled:opacity-50`}
                    >
                        {activeModal === 'CREATE' ? labels.create : labels.confirm}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === 'DELETE' && (
          <div className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center p-8 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
             <div className="w-full max-w-sm border-2 border-red-500 bg-black shadow-[0_0_20px_rgba(239,68,68,0.2)] p-6 flex flex-col gap-4 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
                <h3 className="text-xl font-bold text-red-500">{labels.confirmDelete}</h3>
                <div className="text-sm opacity-80">
                    <span className="font-bold border-b border-red-500/50">{selectedNode?.name}</span>
                </div>
                <p className="text-xs text-red-500/70">{labels.warning}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={closeModal} className="px-6 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">{labels.cancel}</button>
                    <button onClick={handleDelete} className="px-6 py-2 bg-red-500 text-black font-bold hover:bg-red-400 transition-colors">{labels.delete}</button>
                </div>
             </div>
          </div>
      )}

      {/* --- TOOLBAR --- */}
      <div className={`flex items-center gap-2 border-b ${dimBorder} pb-2 mb-2 shrink-0 h-10`}>
        <button 
          onClick={handleUp} 
          disabled={currentPath.length <= 1}
          className={`flex items-center gap-1 ${hoverBg} px-2 py-1 disabled:opacity-30 transition-colors h-full`}
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline text-xs">{labels.back}</span>
        </button>
        
        {/* Breadcrumbs */}
        <div className={`opacity-50 px-2 truncate flex-1 border-l border-r ${dimBorder} mx-2 text-xs flex items-center`}>
           {currentPath.map((n, i) => (
               <React.Fragment key={n.id}>
                   {i > 0 && <span className="mx-1">/</span>}
                   <span className={i === currentPath.length -1 ? 'font-bold' : ''}>{n.name}</span>
               </React.Fragment>
           ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
            <button onClick={() => openCreateModal('FILE')} className={`p-1.5 ${hoverBg} transition-colors`} title={labels.newFile}>
                <FilePlus size={18} />
            </button>
            <button onClick={() => openCreateModal('DIR')} className={`p-1.5 ${hoverBg} transition-colors`} title={labels.newFolder}>
                <FolderPlus size={18} />
            </button>
            <div className={`w-[1px] h-4 ${isEmergency ? 'bg-red-500/30' : 'bg-magi-orange/30'} mx-1`}></div>
            <button 
                onClick={openRenameModal} 
                disabled={!selectedNode} 
                className={`p-1.5 ${hoverBg} disabled:opacity-30 transition-colors`} 
                title={labels.rename}
            >
                <Edit3 size={18} />
            </button>
            <button 
                onClick={openDeleteModal} 
                disabled={!selectedNode} 
                className="p-1.5 hover:bg-red-500/20 hover:text-red-500 disabled:opacity-30 transition-colors" 
                title={labels.delete}
            >
                <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-1 gap-4 overflow-hidden h-full min-h-0">
        
        {/* File List */}
        <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 ${isEmergency ? 'bg-red-500/5 border-red-500/10' : 'bg-magi-orange/5 border-magi-orange/10'} border`}>
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-black z-10">
              <tr className={`opacity-50 border-b ${dimBorder} text-xs`}>
                <th className="py-2 pl-2 font-normal w-8"></th>
                <th className="py-2 font-normal">{labels.name}</th>
                <th className="py-2 font-normal w-24 text-right pr-2">{labels.security}</th>
              </tr>
            </thead>
            <tbody>
              {currentFolder.children?.map(node => (
                <tr 
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  onDoubleClick={() => handleEnter(node)}
                  className={`
                    cursor-pointer transition-colors border-b ${isEmergency ? 'border-red-500/5' : 'border-magi-orange/5'}
                    ${selectedNode?.id === node.id ? `${accentBg} text-black font-bold` : hoverBg}
                  `}
                >
                  <td className="py-2 pl-2">
                    {node.type === 'DIR' ? <Folder size={14} className="fill-current opacity-50" /> : <FileText size={14} className="opacity-50" />}
                  </td>
                  <td className="py-2 truncate max-w-[150px]">{node.name}</td>
                  <td className="py-2 text-[10px] text-right pr-2 opacity-70">{node.securityLevel || '-'}</td>
                </tr>
              ))}
              {(!currentFolder.children || currentFolder.children.length === 0) && (
                <tr>
                  <td colSpan={3} className="py-12 text-center opacity-30 text-xs tracking-widest">{labels.empty}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Preview Pane */}
        <div className={`w-[300px] border-l ${dimBorder} pl-4 flex flex-col h-full min-h-0 shrink-0`}>
          <div className={`text-xs opacity-50 mb-2 border-b ${dimBorder} pb-1 flex justify-between items-center shrink-0 h-8`}>
             <span>{labels.preview}</span>
             {selectedNode && (
               <span className={`text-[10px] ${isEmergency ? 'bg-red-500/20' : 'bg-magi-orange/20'} px-1`}>{selectedNode.type}</span>
             )}
          </div>
          
          {selectedNode ? (
            <div className="flex flex-col h-full overflow-hidden animate-in slide-in-from-right-4 duration-300">
              <div className="font-bold mb-2 break-all shrink-0 text-lg leading-tight">{selectedNode.name}</div>
              
              <div className={`flex-1 overflow-hidden relative border ${dimBorder} bg-black min-h-0 flex flex-col`}>
                {selectedNode.type === 'FILE' ? (
                    <>
                        {isEditingContent ? (
                             <textarea 
                                value={editorContent}
                                onChange={(e) => setEditorContent(e.target.value)}
                                className={`w-full h-full bg-black p-2 ${mainColor} font-mono text-xs outline-none resize-none custom-scrollbar`}
                                spellCheck="false"
                             />
                        ) : (
                             <div className="w-full h-full p-2 overflow-y-auto custom-scrollbar text-xs whitespace-pre-wrap opacity-80">
                                {selectedNode.content}
                             </div>
                        )}
                        
                        {/* Edit Toolbar Overlay */}
                        <div className="absolute bottom-2 right-2 flex gap-2">
                             {isEditingContent ? (
                                <>
                                    <button onClick={() => setIsEditingContent(false)} className={`bg-black border ${borderColor} p-1 ${isEmergency ? 'hover:bg-red-500' : 'hover:bg-magi-orange'} hover:text-black transition-colors`} title={labels.cancel}>
                                        <X size={14} />
                                    </button>
                                    <button onClick={handleSaveContent} className={`${accentBg} text-black border ${borderColor} p-1 hover:bg-white transition-colors`} title={labels.save}>
                                        <Save size={14} />
                                    </button>
                                </>
                             ) : (
                                <button onClick={() => setIsEditingContent(true)} className={`bg-black/50 backdrop-blur border ${dimBorder} p-1 ${isEmergency ? 'hover:bg-red-500' : 'hover:bg-magi-orange'} hover:text-black transition-colors`} title={labels.edit}>
                                    <Edit3 size={14} />
                                </button>
                             )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 gap-2">
                        <Folder size={48} strokeWidth={1} />
                        <span className="text-xs tracking-widest">DIRECTORY</span>
                    </div>
                )}
              </div>

              {/* Footer Metadata */}
              <div className="mt-2 shrink-0 space-y-2">
                <div className={`text-[10px] opacity-50 grid grid-cols-2 gap-1 border-t ${isEmergency ? 'border-red-500/10' : 'border-magi-orange/10'} pt-2`}>
                    <div>{labels.size}: {selectedNode.size || '--'}</div>
                    <div>SEC: {selectedNode.securityLevel}</div>
                    <div className="col-span-2 text-[9px] font-sans">ID: {selectedNode.id}</div>
                </div>
                
                {selectedNode.type === 'FILE' && (
                    <button 
                        onClick={handleMagiAnalyze}
                        className={`w-full flex items-center justify-center gap-2 bg-magi-dark border ${borderColor} ${mainColor} ${isEmergency ? 'hover:bg-red-500' : 'hover:bg-magi-orange'} hover:text-black transition-colors py-2 text-xs font-bold uppercase`}
                    >
                        <Cpu size={14} />
                        {labels.analyze}
                    </button>
                )}
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-full opacity-20">
               <ShieldAlert size={48} strokeWidth={1} />
               <div className="mt-2 text-xs tracking-[0.2em]">NO SELECTION</div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;