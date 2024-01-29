import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { FieldTypes } from '../../../../../packages/payload/src/admin/components/forms/field-types'
import { CollectionEditViewProps } from '../../../../../packages/payload/src/admin/components/views/types'

import { getTranslation } from '../../../../../packages/payload/src/utilities/getTranslation'
import { DocumentControls } from '../../../../../packages/payload/src/admin/components/elements/DocumentControls'
import { DocumentFields } from '../../../../../packages/payload/src/admin/components/elements/DocumentFields'
import { LeaveWithoutSaving } from '../../../../../packages/payload/src/admin/components/modals/LeaveWithoutSaving'
import Meta from '../../../../../packages/payload/src/admin/components/utilities/Meta'
import Auth from '../../../../../packages/payload/src/admin/components/views/collections/Edit/Auth'
import { SetStepNav } from '../../../../../packages/payload/src/admin/components/views/collections/Edit/SetStepNav'
import { Upload } from '../../../../../packages/payload/src/admin/components/views/collections/Edit/Upload'
// import './index.scss'

const baseClass = 'collection-default-edit'

const TestEditView: React.FC<
  CollectionEditViewProps & {
    fieldTypes: FieldTypes
  }
> = (props) => {
  const { i18n, t } = useTranslation('general')

  const {
    id,
    apiURL,
    collection,
    data,
    disableActions,
    disableLeaveWithoutSaving,
    fieldTypes,
    hasSavePermission,
    internalState,
    isEditing,
    permissions,
  } = props

console.log("custom", permissions)

  const { auth, fields, upload } = collection

  const operation = isEditing ? 'update' : 'create'

  return (
    <Fragment>
      <Meta
        description={`${isEditing ? t('editing') : t('creating')} - ${getTranslation(
          collection.labels.singular,
          i18n,
        )}`}
        keywords={`${getTranslation(collection.labels.singular, i18n)}, Payload, CMS`}
        title={`${isEditing ? t('editing') : t('creating')} - ${getTranslation(
          collection.labels.singular,
          i18n,
        )}`}
      />
      {!(collection.versions?.drafts && collection.versions?.drafts?.autosave) &&
        !disableLeaveWithoutSaving && <LeaveWithoutSaving />}
      <SetStepNav collection={collection} id={id} isEditing={isEditing} />
      <DocumentControls
        apiURL={apiURL}
        collection={collection}
        data={data}
        disableActions={disableActions}
        hasSavePermission={hasSavePermission}
        id={id}
        isEditing={isEditing}
        permissions={permissions}
      />
      <DocumentFields
        BeforeFields={
          <Fragment>
            {auth && (
              <Auth
                className={`${baseClass}__auth`}
                collection={collection}
                email={data?.email}
                operation={operation}
                readOnly={!hasSavePermission}
                requirePassword={!isEditing}
                useAPIKey={auth.useAPIKey}
                verify={auth.verify}
              />
            )}
            {upload && <Upload collection={collection} internalState={internalState} />}
          </Fragment>
        }
        fieldTypes={fieldTypes}
        fields={fields}
        hasSavePermission={hasSavePermission}
        permissions={permissions}
      />
    </Fragment>
  )
}

export default TestEditView
