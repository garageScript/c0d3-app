import React from 'react'
import ReviewCard from '../../components/ReviewCard'
export default {
  component: ReviewCard,
  title: 'Components/ReviewCard'
}

import { MockedProvider } from '@apollo/client/testing'
import ACCEPT_SUBMISSION from '../../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../../graphql/queries/rejectSubmission'
import { SubmissionStatus } from '../../graphql'
const mocks = [
  {
    request: {
      query: ACCEPT_SUBMISSION,
      variables: { id: '1', comment: 'good job' }
    },
    result: {
      data: {
        acceptSubmission: {
          id: '1',
          comment: 'good job'
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        id: '1',
        comment: 'error on line 3'
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: '1',
          comment: 'error on line 3'
        }
      }
    }
  }
]

const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||withComment|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;@@ -111,280 +111,291 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];|||foobar|||\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
const LongDiff = `diff --git a/scm-ui/public/locales/de/repos.json b/scm-ui/public/locales/de/repos.json
--- a/scm-ui/public/locales/de/repos.json
+++ b/scm-ui/public/locales/de/repos.json
@@ -61,7 +61,8 @@
   },
   "repositoryForm": {
     "subtitle": "Repository bearbeiten",
-    "submit": "Speichern"
+    "submit": "Speichern",
+    "noPermissionNotification": "Hinweis: Es fehlen Berechtigungen zum Anzeigen der allgemeinen Repositoryeinstellungen!"
   },
   "sources": {
     "file-tree": {
diff --git a/scm-ui/public/locales/en/repos.json b/scm-ui/public/locales/en/repos.json
--- a/scm-ui/public/locales/en/repos.json
+++ b/scm-ui/public/locales/en/repos.json
@@ -61,7 +61,8 @@
   },
   "repositoryForm": {
     "subtitle": "Edit Repository",
-    "submit": "Save"
+    "submit": "Save",
+    "noPermissionNotification": "Please note: You do not have the permission to view the general repository settings!"
   },
   "sources": {
     "file-tree": {
diff --git a/scm-ui/src/repos/containers/EditRepo.js b/scm-ui/src/repos/containers/EditRepo.js
--- a/scm-ui/src/repos/containers/EditRepo.js
+++ b/scm-ui/src/repos/containers/EditRepo.js
@@ -12,9 +12,10 @@
   modifyRepoReset
 } from "../modules/repos";
 import type { History } from "history";
-import { ErrorNotification } from "@scm-manager/ui-components";
+import { ErrorNotification, Notification } from "@scm-manager/ui-components";
 import { ExtensionPoint } from "@scm-manager/ui-extensions";
 import { compose } from "redux";
+import { translate } from "react-i18next";

 type Props = {
   loading: boolean,
@@ -27,13 +28,30 @@
   // context props
   repository: Repository,
   history: History,
-  match: any
+  match: any,
+  t: string => string
+};
+
+type State = {
+  showNotification: boolean
 };

-class EditRepo extends React.Component<Props> {
+class EditRepo extends React.Component<Props, State> {
+  constructor(props: Props) {
+    super(props);
+
+    this.state = {
+      showNotification: false
+    };
+  }
+
   componentDidMount() {
-    const { modifyRepoReset, repository } = this.props;
+    const { canModifyRepo, modifyRepoReset, repository } = this.props;
     modifyRepoReset(repository);
+
+    if (!canModifyRepo) {
+      this.setState({ ...this.state, showNotification: true });
+    }
   }

   repoModified = () => {
@@ -49,7 +67,7 @@
   };

   matchedUrl = () => {
-    return this.stripEndingSlash(this.props.match.url);
+    return this.stripEndingSlash("/config"); // TODO: use something like this.props.match.url instead
   };

   render() {
@@ -77,7 +95,19 @@
   }

   renderRepositoryForm() {
-    const { canModifyRepo, repository, loading } = this.props;
+    const { canModifyRepo, repository, loading, t } = this.props;
+
+    let noPermissionNotification = null;
+    if (this.state.showNotification) {
+      noPermissionNotification = (
+        <Notification
+          type={"info"}
+          children={t("repositoryForm.noPermissionNotification")}
+          onClose={() => this.onClose()}
+        />
+      );
+    }
+
     if (canModifyRepo) {
       return (
         <RepositoryForm
@@ -89,7 +119,15 @@
         />
       );
     }
+    return noPermissionNotification;
   }
+
+  onClose = () => {
+    this.setState({
+      ...this.state,
+      showNotification: false
+    });
+  };
 }

 const mapStateToProps = (state, ownProps) => {
@@ -116,6 +154,7 @@
 };

 export default compose(
+  translate("repos"),
   connect(
     mapStateToProps,
     mapDispatchToProps`
const submissionData = {
  id: 1,
  status: SubmissionStatus.Open,
  mrUrl: '',
  diff: JsDiff,
  viewCount: 0,
  comment: 'Some comment',
  order: 0,
  challengeId: 146,
  lessonId: 2,
  user: {
    username: 'fake user',
    id: 1,
    isAdmin: false
  },
  challenge: {
    id: 23,
    title: 'fake challenge',
    description: 'fake description',
    lessonId: 2,
    order: 1
  },
  reviewer: {
    id: 1,
    username: 'fake reviewer',
    isAdmin: false
  },
  createdAt: '123',
  updatedAt: '123'
}

export const ActiveCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={submissionData} />
  </MockedProvider>
)
export const WithLongDiff: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={{ ...submissionData, diff: LongDiff }} />
  </MockedProvider>
)
export const NoDiffCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={{ ...submissionData, diff: '' }} />
  </MockedProvider>
)
