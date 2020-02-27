# 从Android源码屏蔽权限请求对话框


* 注意：使用此方法后，APP每次只能请求一个权限

* 文件：packages/apps/PackageInstaller/src/com/android/packageinstaller/permission/ui/GrantPermissionsActivity.java
* 函数：showNextPermissionGroupGrantRequest()函数修改如下：

```c
private boolean showNextPermissionGroupGrantRequest() {
        final int groupCount = mRequestGrantPermissionGroups.size();

        int currentIndex = 0;
        for (GroupState groupState : mRequestGrantPermissionGroups.values()) {
            if (groupState.mState == GroupState.STATE_UNKNOWN) {
                CharSequence appLabel = mAppPermissions.getAppLabel();
                SpannableString message = new SpannableString(getString(
                        R.string.permission_warning_template, appLabel,
                        groupState.mGroup.getDescription()));
                // Set the permission message as the title so it can be announced.
                setTitle(message);
                // Color the app name.
                int appLabelStart = message.toString().indexOf(appLabel.toString(), 0);
                int appLabelLength = appLabel.length();
                message.setSpan(new StyleSpan(Typeface.BOLD), appLabelStart,
                        appLabelStart + appLabelLength, 0);

                // Set the new grant view
                // TODO: Use a real message for the action. We need group action APIs
                Resources resources;
                try {
                    resources = getPackageManager().getResourcesForApplication(
                            groupState.mGroup.getIconPkg());
                } catch (NameNotFoundException e) {
                    // Fallback to system.
                    resources = Resources.getSystem();
                }
                int icon = groupState.mGroup.getIconResId();

                mViewHandler.updateUi(groupState.mGroup.getName(), groupCount, currentIndex,
                        Icon.createWithResource(resources, icon), message,
                        groupState.mGroup.isUserSet());

				/* modified by fhc 2017-11-28 */
				GroupState myGroupState = mRequestGrantPermissionGroups.get(groupState.mGroup.getName());
				if (myGroupState.mGroup != null) {
					
				myGroupState.mGroup.grantRuntimePermissions(false);
				myGroupState.mState = GroupState.STATE_ALLOWED;
					
					updateGrantResults(myGroupState.mGroup);
				}
							
                //return true;
                return false;
				
				/* modified by fhc 2017-11-28 end*/
				
            }

            currentIndex++;
        }

        return false;
    }

```
