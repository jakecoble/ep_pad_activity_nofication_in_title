'use strict';

exports.postAceInit = (hook, context) => {
  context.ace.callWithAce((ace) => {
    const doc = ace.ace_getDocument();
    $(doc).find('#innerdocbody').mousemove(exports.userActive.bind(ace));
    $(doc).find('#innerdocbody').keypress(exports.userActive.bind(ace));
  }, 'hovering', true);
};

function getDocument() {
  try {
    return parent.parent.document
  } catch (e) {
    console.warn(e)
    return null
  }
}

exports.aceEditEvent = (hookName, args) => {
  const doc = getDocument();
  const padTitle = doc.title;

  const caretMoving = (args.callstack.type === 'applyChangesToBase');
  if (!caretMoving) return false;

  if (padTitle[0] !== '*') {
    let prevTitle;
    if (padTitle[0] === '*') {
      prevTitle = padTitle.substring(2, padTitle.length);
    } else {
      prevTitle = padTitle;
    }
    const newTitle = `* ${prevTitle}`;
    parent.parent.document.title = newTitle;
  }
};

exports.userActive = () => {
  const doc = getDocument();
  const padTitle = doc.title;
  if (padTitle[0] === '*') {
    doc.title = doc.title.substring(1, doc.title.length);
  }
};
